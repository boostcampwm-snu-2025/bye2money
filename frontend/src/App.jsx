import MainPage from "./pages/MainPage.jsx";
import { ModalProvider } from "./shared/context/ModalContext.jsx";

function App() {
  return (
    <ModalProvider>
      <MainPage />
    </ModalProvider>
  )
}

export default App
