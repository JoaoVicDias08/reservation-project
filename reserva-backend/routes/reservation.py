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
