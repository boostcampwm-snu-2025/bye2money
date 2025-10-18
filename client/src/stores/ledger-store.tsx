import React,{createContext,useContext,useEffect,useMemo,useReducer} from 'react';
import type {LedgerState,Txn,PaymentMethod,Tab} from '../types/ledger';
import { ym } from '../lib/date';

type Action =
  | {type:'hydrate'; payload: Pick<LedgerState,'txns'|'methods'>}
  | {type:'setMonth'; year:number; month:number}
  | {type:'switchTab'; tab:Tab}
  | {type:'addTxn'|'updateTxn'; txn:Txn}
  | {type:'removeTxn'; id:string}
  | {type:'addMethod'; method:PaymentMethod}
  | {type:'removeMethod'; id:string}
  | {type:'setEditing'; id?:string};

const LOCAL='wise-wallet-state-v1';
const now = ym(new Date());
const init:LedgerState = { txns:[], methods:[], ui:{tab:'list',year:now.year,month:now.month} };

function reducer(s:LedgerState,a:Action):LedgerState{
  switch(a.type){
    case 'hydrate': return { ...s, txns: a.payload.txns, methods: a.payload.methods };
    case 'setMonth': return { ...s, ui:{...s.ui, year:a.year, month:a.month} };
    case 'switchTab': return { ...s, ui:{...s.ui, tab:a.tab} };
    case 'addTxn': return { ...s, txns:[a.txn, ...s.txns] };
    case 'updateTxn': return { ...s, txns:s.txns.map(t=>t.id===a.txn.id?a.txn:t), ui:{...s.ui,editingId:undefined} };
    case 'removeTxn': return { ...s, txns:s.txns.filter(t=>t.id!==a.id) };
    case 'addMethod': return { ...s, methods:[...s.methods, a.method] };
    case 'removeMethod': return {
      ...s,
      methods: s.methods.filter(m=>m.id!==a.id),
      txns: s.txns.map(t=>t.methodId===a.id?{...t, methodId:''}:t)
    };
    case 'setEditing': return { ...s, ui:{...s.ui, editingId:a.id} };
    default: return s;
  }
}

const Ctx = createContext<{state:LedgerState; dispatch:React.Dispatch<Action>}>({} as any);

export function LedgerProvider({children}:{children:React.ReactNode}){
  const [state,dispatch] = useReducer(reducer, init);

  // 복원 or 시드 로드
  useEffect(()=> {
    const raw = localStorage.getItem(LOCAL);
    if (raw) {
      try { const p = JSON.parse(raw); if (p.txns && p.methods) { dispatch({type:'hydrate',payload:p}); return; } }
      catch {}
    }
    (async()=>{ const r=await fetch('/data/seed.json'); dispatch({type:'hydrate',payload:await r.json()}); })();
  }, []);

  // 영속
  const persist = useMemo(()=>({txns:state.txns, methods:state.methods}), [state.txns,state.methods]);
  useEffect(()=>{ localStorage.setItem(LOCAL, JSON.stringify(persist)); }, [persist]);

  return <Ctx.Provider value={{state,dispatch}}>{children}</Ctx.Provider>;
}
export const useLedger = () => useContext(Ctx);
