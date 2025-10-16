import { Layout } from "@/components/common/Layout";
import { Header } from "@/components/domain/Header";
import { InputBar } from "./components/domain/InputBar";

function App() {
  return (
    <Layout>
      <Header />
      <InputBar />
    </Layout>
  );
}

export default App;