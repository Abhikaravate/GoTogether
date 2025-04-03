from config import mongo
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class User:
    @staticmethod
    def create_user(email, password):
        hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
        user = {"email": email, "password": hashed_pw}
        return mongo.db.users.insert_one(user)

    @staticmethod
    def find_user(email):
        return mongo.db.users.find_one({"email": email})
