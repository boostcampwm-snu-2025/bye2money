import { useReducer, useCallback } from "react";
import { useLedgerStore } from "../store/useLedgerStore";
import { entryReducer, initialEntry } from "../reducers/entryReducer";

export default function useEntryForm() {
  const addRecord = useLedgerStore(s => s.addRecord);
  const updateRecord = useLedgerStore(s => s.updateRecord);
  const removeRecord = useLedgerStore(s => s.removeRecord);

  const [form, dispatch] = useReducer(entryReducer, initialEntry);

  const submit = useCallback(() => {
    const payload = {
      date: form.date,
      type: form.type,
      category: form.category || "미분류",
      payment: form.payment || "",
      amount: Number(form.amount || 0),
      memo: form.memo?.slice(0, 32) || "",
    };
    if (!payload.date || !payload.amount) return;
    form.mode === "create"
      ? addRecord(payload)
      : updateRecord(form.editingId, payload);
    dispatch({ type: "RESET" });
  }, [form, addRecord, updateRecord]);

  const requestDelete = useCallback((id, openAlert) => {
    openAlert({
      title: "내역 삭제",
      message: "해당 내역을 삭제할까요?",
      onConfirm: () => setTimeout(() => removeRecord(id), 1000),
    });
  }, [removeRecord]);

  return { form, dispatch, submit, requestDelete };
}
