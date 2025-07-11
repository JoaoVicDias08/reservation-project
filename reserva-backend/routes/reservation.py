from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.reservation import Reservation
from schemas.reservation import ReservationCreate

router = APIRouter()

@router.post("/reservar")
def create_reservation(reservation: ReservationCreate, db: Session = Depends(get_db)):
    new_reservation = Reservation(
        date=reservation.date,
        time=reservation.time,
        reason=reservation.reason,
        user_email=reservation.user_email
    )
    db.add(new_reservation)
    db.commit()
    db.refresh(new_reservation)
    return {"message": "Reserva feita com sucesso!"}
