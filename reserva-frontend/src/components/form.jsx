import "../styles/form.css";
import "../styles/index.css";

import Card from './card';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  Users,
  LogIn,
  LogOut,
} from "lucide-react";

export default function Form() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    alert("Você saiu da conta.");
    navigate("/");
  };

  const availableTimes = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30",
  ];

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === month;
      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const isSelected = selectedDate && date.getTime() === selectedDate.getTime();

      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isPast,
        isToday,
        isSelected,
      });
    }

    return days;
  };

  const handleDateSelect = (day) => {
    if (!day.isPast && day.isCurrentMonth) {
      setSelectedDate(day.date);
      if (errors.date) {
        setErrors((prev) => ({ ...prev, date: "" }));
      }
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (errors.time) {
      setErrors((prev) => ({ ...prev, time: "" }));
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    if (errors.reason) {
      setErrors((prev) => ({ ...prev, reason: "" }));
    }
  };

  const validateScheduling = () => {
    const newErrors = {};

    if (!selectedDate) newErrors.date = "Selecione uma data";
    if (!selectedTime) newErrors.time = "Selecione um horário";
    if (!reason.trim()) newErrors.reason = "Informe o motivo do agendamento";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSchedule = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Você precisa estar logado para agendar.");
      return;
    }

    if (validateScheduling()) {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      const scheduleData = {
        date: selectedDate.toLocaleDateString("pt-BR"),
        time: selectedTime,
        reason: reason.trim(),
        user_email: email,
      };

      try {
        const response = await fetch("http://localhost:8000/reservar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(scheduleData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || "Erro ao agendar");
        }

        const result = await response.json();
        alert(result.message);

        // Resetar formulário
        setSelectedDate(null);
        setSelectedTime("");
        setReason("");

      } catch (err) {
        alert(err.message);
        console.error("Erro ao enviar agendamento:", err);
      }
    }
  };

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="form-container">
      <div className="form-content">

        {/* Seção de Cadastro/Login */}
        <div className="form-field">
          <div className="form-card">
            <h1 className="form-title">Garanta já sua vaga!</h1>
            <p className="form-text">
              Evite filas e imprevistos reservando com antecedência. Com apenas alguns cliques, você assegura seu lugar
              e aproveita uma experiência tranquila, rápida e exclusiva.
            </p>

            <div className="benefits-section">
              <div className="benefit-item">
                <Users className="benefit-icon" size={16} />
                <span className="benefit-text">Vagas limitadas</span>
              </div>
              <div className="benefit-item">
                <Clock className="benefit-icon" size={16} />
                <span className="benefit-text">Processo rápido</span>
              </div>
              <div className="benefit-item">
                <Calendar className="benefit-icon" size={16} />
                <span className="benefit-text">Agendamento flexível</span>
              </div>
            </div>

            <Card />

            {!isLoggedIn ? (
              <>
                <div className="form-cta-text">
                  <p>Cadastre-se ou entre em sua conta para começar:</p>
                </div>

                <div className="form-btn-container">
                  <button className="form-btn-sign-up" onClick={() => navigate("/cadastro")}>
                    <Users size={18} />
                    Cadastrar-se
                  </button>
                  <button className="form-btn-login" onClick={() => navigate("/login")}>
                    <LogIn size={18} />
                    Entrar
                  </button>
                </div>

                <div className="additional-info">
                  <p className="info-text">
                    Já tem conta? Faça login para acessar seus agendamentos anteriores e preferências salvas.
                  </p>
                </div>
              </>
            ) : (
              <div style={{ marginTop: "1rem" }}>
                <button
                  className="form-btn-logout"
                  onClick={handleLogout}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <LogOut size={18} />
                  Sair da conta
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Seção de Agendamento */}
        <div className="scheduling-field">
          <div className="scheduling-card">
            <h2 className="scheduling-title">Agende seu Horário</h2>
            <p className="scheduling-subtitle">Escolha a data, horário e motivo do seu agendamento</p>

            <form onSubmit={handleSchedule}>

              <div className="calendar-section">
                <div className="calendar-header">
                  <button
                    type="button"
                    className="calendar-nav"
                    onClick={() =>
                      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
                    }
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h3 className="calendar-month">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button
                    type="button"
                    className="calendar-nav"
                    onClick={() =>
                      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
                    }
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="calendar-weekdays">
                  {weekDays.map((day) => (
                    <div key={day} className="weekday">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="calendar-grid">
                  {generateCalendarDays().map((day, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`calendar-day ${!day.isCurrentMonth ? "other-month" : ""} ${
                        day.isPast ? "past" : ""
                      } ${day.isToday ? "today" : ""} ${day.isSelected ? "selected" : ""}`}
                      onClick={() => handleDateSelect(day)}
                      disabled={day.isPast || !day.isCurrentMonth}
                    >
                      {day.day}
                    </button>
                  ))}
                </div>
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>

              <div className="time-section">
                <div className="section-header">
                  <Clock size={20} className="section-icon" />
                  <h4 className="section-title">Horário</h4>
                </div>
                <div className="time-grid">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>

              <div className="reason-section">
                <div className="section-header">
                  <FileText size={20} className="section-icon" />
                  <h4 className="section-title">Motivo do Agendamento</h4>
                </div>
                <textarea
                  className={`reason-textarea ${errors.reason ? "error" : ""}`}
                  placeholder="Descreva o motivo do seu agendamento..."
                  value={reason}
                  onChange={handleReasonChange}
                  rows={3}
                />
                {errors.reason && <span className="error-message">{errors.reason}</span>}
              </div>

              {(selectedDate || selectedTime || reason) && (
                <div className="schedule-summary">
                  <h4 className="summary-title">Resumo do Agendamento</h4>
                  <div className="summary-content">
                    {selectedDate && (
                      <div className="summary-item">
                        <Calendar size={16} />
                        <span>Data: {selectedDate.toLocaleDateString("pt-BR")}</span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="summary-item">
                        <Clock size={16} />
                        <span>Horário: {selectedTime}</span>
                      </div>
                    )}
                    {reason && (
                      <div className="summary-item">
                        <FileText size={16} />
                        <span>
                          Motivo: {reason.substring(0, 50)}
                          {reason.length > 50 ? "..." : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button type="submit" className="schedule-button">
                Confirmar Agendamento
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
