import "../styles/index.css";
import "../styles/card.css";

import { Award, Zap, Rocket } from "lucide-react";

export default function Card() {
  return (
    <div className="feature-card-container">
      <div className="feature-card">
        <Award size={36} className="feature-icon" />
        <h2 className="feature-title">Qualidade Premium</h2>
        <p className="feature-description">
          Nossos serviços são projetados para oferecer a melhor experiência, com atenção aos detalhes e excelência em
          cada etapa.
        </p>
      </div>

      <div className="feature-card">
        <Zap size={36} className="feature-icon" />
        <h2 className="feature-title">Agilidade e Eficiência</h2>
        <p className="feature-description">
          Otimizamos cada processo para garantir que você tenha um atendimento rápido e eficaz, sem complicações.
        </p>
      </div>

      <div className="feature-card">
        <Rocket size={36} className="feature-icon" />
        <h2 className="feature-title">Inovação Constante</h2>
        <p className="feature-description">
          Estamos sempre buscando as últimas tendências e tecnologias para oferecer soluções modernas e à frente do seu
          tempo.
        </p>
      </div>
    </div>
  );
}
