from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String)
    time = Column(String)
    reason = Column(String)
    user_email = Column(String, ForeignKey("users.email"))  # chave estrangeira para users.email

    user = relationship("User", back_populates="reservations")
