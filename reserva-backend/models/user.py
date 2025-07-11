from sqlalchemy import Column, Integer, String
from database import Base  # Base deve vir do seu arquivo database.py
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    reservations = relationship("Reservation", back_populates="user")
