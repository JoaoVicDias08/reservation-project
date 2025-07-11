import React, { useEffect, useState } from "react";
import '../styles/reservas.css'
import '../styles/index.css'

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  // Função para buscar reservas
  const fetchReservas = async () => {
    if (!email || !token) return;

    try {
      const response = await fetch(`http://localhost:8000/minhas-reservas?user_email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar reservas");
      }

      const data = await response.json();
      setReservas(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para remover reserva
  const handleRemover = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover essa reserva?")) return;

    try {
      const response = await fetch(`http://localhost:8000/reservar/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao remover reserva");
      }

      alert("Reserva removida com sucesso!");
      fetchReservas(); // Atualiza lista
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  if (!email) return <p style={{ color: 'var(--color-text)', textAlign: 'center', marginTop: '2rem' }}>Você precisa estar logado para ver suas reservas.</p>;

  if (loading) return <p style={{ color: 'var(--color-text)', textAlign: 'center', marginTop: '2rem' }}>Carregando reservas...</p>;

  if (reservas.length === 0) return <p style={{ color: 'var(--color-text)', textAlign: 'center', marginTop: '2rem' }}>Nenhuma reserva encontrada.</p>;

  return (
    <div className="reservations-container">
      <h2 className="reservations-title">Minhas Reservas</h2>
      <ul className="reservation-list">
        {reservas.map(({ id, date, time, reason }) => (
          <li key={id} className="reservation-item">
            <span className="reservation-date-time">
              {new Date(date).toLocaleDateString("pt-BR")} às {time}
            </span>
            <p className="reservation-reason">{reason}</p>
            <button className="reservation-delete-btn" onClick={() => handleRemover(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
