from passlib.context import CryptContext
from bson.objectid import ObjectId
from app.database import users_collection
from fastapi import HTTPException
from app.models import UserCreate, UserLogin
from jose import jwt
from datetime import datetime, timedelta
import os

# Load secret key for JWT
SECRET_KEY = os.getenv("SECRET_KEY", "mysecret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Context for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash the password
def get_password_hash(password):
    return pwd_context.hash(password)

# Verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Create JWT token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Register a new user
async def register_user(user_data: UserCreate):
    existing_user = users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user_data.password)
    user_dict = user_data.dict()
    user_dict["password"] = hashed_password
    users_collection.insert_one(user_dict)
    return user_dict

# Authenticate a user
async def authenticate_user(user_data: UserLogin):
    user = users_collection.find_one({"email": user_data.email})
    if not user or not verify_password(user_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return user
