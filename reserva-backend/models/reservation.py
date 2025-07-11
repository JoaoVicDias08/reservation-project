from sqlalchemy import Column, Integer, String, Date, Time
from database import Base

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    reason = Column(String, nullable=False)
    user_email = Column(String, nullable=False)
