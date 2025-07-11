from datetime import datetime, timedelta
from jose import jwt

# Chave secreta para assinar o token (nunca exponha isso em produção)
SECRET_KEY = "sua_chave_secreta_supersegura"
ALGORITHM = "HS256"
EXPIRATION_MINUTES = 60  # Tempo de expiração do token

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=EXPIRATION_MINUTES)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
    