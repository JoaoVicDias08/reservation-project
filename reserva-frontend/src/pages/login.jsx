import "../styles/login.css";
import "../styles/index.css";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:8000/login", {
      email: formData.email,
      password: formData.password,
    });

    // Salvar token no localStorage depois que o login for bem-sucedido
    localStorage.setItem("token", response.data.access_token);

    alert("Login efetuado com sucesso!");
    navigate("/"); // Vai para a página inicial ou dashboard

  } catch (error) {
    const msg = error.response?.data?.detail || "Erro ao fazer login";
    alert(msg);
  }
};

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-header">
          <h1 className="form-title">Bem-vindo de volta</h1>
          <p className="form-subtitle">Faça login em sua conta</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Senha"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <button type="button" className="forgot-password">
              Esqueci minha senha
            </button>
          </div>

          <button type="submit" className="submit-button">
            Entrar
          </button>

          <div className="form-footer">
            <p className="signup-link">
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="link-button">
                Criar conta
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
