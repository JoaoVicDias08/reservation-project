import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login"; // Correto: está em src/pages
import Cadastro from "./pages/cadastro";   // Correto: está em src/pages
import Form from "./components/form";      // Este está em components, ok

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}
