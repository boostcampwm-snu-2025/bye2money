import ConfirmModal from "../components/ConfirmModal";
import { createContext, useContext, useState, useCallback } from "react";

const UiCtx = createContext(null);
export const useUi = () => useContext(UiCtx);

export function UiProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openConfirm = useCallback((opts) => {
    setModal({ type: "confirm", ...opts });
  }, []);

  const openAlert = useCallback((message, title = "알림") => {
    setModal({ type: "alert", message, title });
  }, []);

  const close = useCallback(() => setModal(null), []);

  return (
    <UiCtx.Provider value={{ openConfirm, openAlert, close }}>
      {children}

      {modal?.type === "confirm" && (
        <ConfirmModal
          open
          title={modal.title}
          message={modal.message}
          confirmText={modal.confirmText ?? "확인"}
          cancelText={modal.cancelText ?? "취소"}
          onConfirm={() => { modal.onConfirm?.(); close(); }}
          onClose={close}
        />
      )}

      {modal?.type === "alert" && (
        <ConfirmModal
          open
          title={modal.title ?? "알림"}
          message={modal.message}
          onlyOk               
          confirmText="확인"     
          onConfirm={close}
          onClose={close}
        />
      )}
    </UiCtx.Provider>
  );
}
