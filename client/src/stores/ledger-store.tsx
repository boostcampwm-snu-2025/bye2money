import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import type { LedgerState, Txn, PaymentMethod, Tab } from '../types/ledger';
import { ym } from '../lib/date';

/* ---------------- Types & Actions ---------------- */
type Action =
  | { type: 'hydrate'; payload: Pick<LedgerState, 'txns' | 'methods'> }
  | { type: 'setMonth'; year: number; month: number }
  | { type: 'switchTab'; tab: Tab }
  | { type: 'addTxn' | 'updateTxn'; txn: Txn }
  | { type: 'removeTxn'; id: string }
  | { type: 'addMethod'; method: PaymentMethod }
  | { type: 'removeMethod'; id: string }
  | { type: 'setEditing'; id?: string };

/* ---------------- Persistence ---------------- */
const LOCAL = 'wise-wallet-state-v1';

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

/* ---------------- Initial State & Reducer ---------------- */
const now = ym(new Date());
const init: LedgerState = {
  txns: [],
  methods: [],                      // 필요 시 seed.json 또는 hydrate로 채워짐
  ui: { tab: 'list', year: now.year, month: now.month }
};

function reducer(s: LedgerState, a: Action): LedgerState {
  switch (a.type) {
    case 'hydrate': {
      // UI는 현재 값 유지, 데이터만 교체
      return { ...s, txns: a.payload.txns ?? [], methods: a.payload.methods ?? [] };
    }
    case 'setMonth':
      return { ...s, ui: { ...s.ui, year: a.year, month: a.month } };
    case 'switchTab':
      return { ...s, ui: { ...s.ui, tab: a.tab } };
    case 'addTxn':
      return { ...s, txns: [a.txn, ...s.txns] };
    case 'updateTxn':
      return { ...s, txns: s.txns.map(t => (t.id === a.txn.id ? a.txn : t)), ui: { ...s.ui, editingId: undefined } };
    case 'removeTxn':
      return { ...s, txns: s.txns.filter(t => t.id !== a.id) };
    case 'addMethod': {
      // id 중복 방지 + 동일 이름 중복도 최소화
      if (s.methods.some(m => m.id === a.method.id) || s.methods.some(m => m.name === a.method.name)) return s;
      return { ...s, methods: [...s.methods, a.method] };
    }
    case 'removeMethod': {
      const left = s.methods.filter(m => m.id !== a.id);
      const fallbackId = left[0]?.id ?? ''; // 남은 게 없으면 빈 문자열(EntryBar에서 새 선택 유도)
      return {
        ...s,
        methods: left,
        txns: s.txns.map(t => (t.methodId === a.id ? { ...t, methodId: fallbackId } : t))
      };
    }
    case 'setEditing':
      return { ...s, ui: { ...s.ui, editingId: a.id } };
    default:
      return s;
  }
}

/* ---------------- Context ---------------- */
const Ctx = createContext<{ state: LedgerState; dispatch: React.Dispatch<Action> }>({} as any);

/* ---------------- Provider ---------------- */
export function LedgerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, init);

  // 1) 복원 완료 여부 플래그: 복원 끝나기 전엔 저장 금지
  const [hydrated, setHydrated] = useState(false);

  // 2) 최초 복원: 로컬 → 없으면 seed.json
  useEffect(() => {
    let mounted = true;

    // 로컬스토리지 우선
    const fromLocal = safeParse<Pick<LedgerState, 'txns' | 'methods'>>(typeof window !== 'undefined' ? localStorage.getItem(LOCAL) : null);
    if (fromLocal && mounted) {
      dispatch({ type: 'hydrate', payload: fromLocal });
      setHydrated(true);
      return () => { mounted = false; };
    }

    // seed.json로 초기 시드
    (async () => {
      try {
        const res = await fetch('/data/seed.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('seed fetch failed');
        const seed = await res.json();
        if (mounted) {
          dispatch({ type: 'hydrate', payload: seed });
          setHydrated(true);
        }
      } catch {
        // 시드마저 실패하면 최소 안전값 보장 (메서드 1개)
        if (mounted) {
          dispatch({ type: 'hydrate', payload: { txns: [], methods: [{ id: 'cash', name: '현금' }] } });
          setHydrated(true);
        }
      }
    })();

    return () => { mounted = false; };
  }, []);

  // 3) 영속: txns/methods 변경 시에만, 복원 이후에만 저장 (200ms 디바운스)
  const saveTimer = useRef<number | null>(null);
  useEffect(() => {
    if (!hydrated) return; // ✅ 복원 전에는 절대 저장하지 않음
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(LOCAL, JSON.stringify({ txns: state.txns, methods: state.methods }));
      } catch {}
    }, 200);
    return () => { if (saveTimer.current) window.clearTimeout(saveTimer.current); };
  }, [hydrated, state.txns, state.methods]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/* ---------------- Hook ---------------- */
export const useLedger = () => useContext(Ctx);
