from pydantic import BaseModel

class ReservationCreate(BaseModel):
    date: str
    time: str
    reason: str
    user_email: str
