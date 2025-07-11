import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Cadastro from './pages/cadastro'
import Login from './pages/login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App