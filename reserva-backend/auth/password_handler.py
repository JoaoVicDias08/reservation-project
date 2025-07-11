from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Gera o hash da senha
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Verifica se a senha digitada bate com o hash
def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)
