import "../styles/cadastro.css";
import "../styles/index.css";
import { Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/register", {
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.detail || "Erro ao cadastrar";
      alert(msg);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="form-header">
          <h1 className="form-title">Criar Conta</h1>
          <p className="form-subtitle">Preencha os dados para se cadastrar</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

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
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <Phone className="input-icon" size={20} />
              <input
                type="tel"
                name="phone"
                placeholder="Telefone (opcional)"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
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
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmar senha"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Criar Conta
          </button>

          <div className="form-footer">
            <p className="login-link">
              Já tem uma conta?{" "}
              <Link to="/login" className="link-button">
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
