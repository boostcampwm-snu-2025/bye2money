import { createContext, useState, useEffect, useContext } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openModal = (component) => setModal(component);
  const closeModal = () => setModal(null);
  
  // ESC로 모달 닫는, 상식적인 동작 구현
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (modal) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [modal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30"
        >
          {modal}
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}