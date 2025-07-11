from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.user import User  # importe User do módulo correto
from models.reservation import Reservation  # importe Reservation do módulo correto
from schemas.reservation import ReservationCreate
from database import get_db

router = APIRouter()

@router.post("/reservar")
def create_reservation(reservation: ReservationCreate, db: Session = Depends(get_db)):
    user_email = reservation.user_email
    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Email do usuário não encontrado")
    
    new_reservation = Reservation(
        date=reservation.date,
        time=reservation.time,
        reason=reservation.reason,
        user_email=user_email
    )
    db.add(new_reservation)
    db.commit()
    db.refresh(new_reservation)
    return {"message": "Reserva feita com sucesso"}

# listar reservas do usuário
@router.get("/minhas-reservas")
def listar_reservas(user_email: str, db: Session = Depends(get_db)):
    reservas = db.query(Reservation).filter(Reservation.user_email == user_email).all()
    return reservas

# deletar reserva pelo id
@router.delete("/reservar/{reserva_id}")
def deletar_reserva(reserva_id: int, db: Session = Depends(get_db)):
    reserva = db.query(Reservation).filter(Reservation.id == reserva_id).first()
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")
    db.delete(reserva)
    db.commit()
    return {"message": "Reserva removida com sucesso"}
