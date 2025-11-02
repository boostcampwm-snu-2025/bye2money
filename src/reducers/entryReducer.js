export const initialEntry = {
  mode: "create",      
  editingId: null,
  date: "",
  type: "expense",
  category: "",
  payment: "",
  amount: "",
  memo: "",
};

export function entryReducer(state, action) {
  switch (action.type) {
    case "SET": return { ...state, [action.key]: action.value };
    case "LOAD": { 
      const r = action.record;
      return {
        mode: "edit",
        editingId: r.id,
        date: r.date, type: r.type, category: r.category || "미분류",
        payment: r.payment || "", amount: String(r.amount || 0), memo: r.memo || ""
      };
    }
    case "RESET": return initialEntry;
    default: return state;
  }
}
