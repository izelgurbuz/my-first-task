from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from a .env file
load_dotenv()

# MongoDB connection string from environment variables
MONGO_URI = os.getenv("MONGODB_URI")  

# Initialize MongoDB client
client = MongoClient(MONGO_URI)

# Select the database and collection
db = client["mydatabase"]
users_collection = db["users"]
