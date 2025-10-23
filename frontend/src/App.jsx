import MainPage from "./pages/MainPage.jsx";
import { ModalProvider } from "./context/ModalContext";

function App() {
  // 아직 라우팅을 안 배워서, 메인 페이지만 
  return (
    <ModalProvider>
      <MainPage />
    </ModalProvider>
  )
}

export default App
