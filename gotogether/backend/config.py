from flask_pymongo import PyMongo
import os
from dotenv import load_dotenv

load_dotenv()

app_config = {
    "MONGO_URI": os.getenv("MONGO_URI", "mongodb://localhost:27017/rickshaw_sharing")
}

mongo = PyMongo()
