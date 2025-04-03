from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if User.find_user(data["email"]):
        return jsonify({"message": "User already exists"}), 400
    User.create_user(data["email"], data["password"])
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.find_user(data["email"])
    if user and User.bcrypt.check_password_hash(user["password"], data["password"]):
        token = create_access_token(identity=user["email"])
        return jsonify({"token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401
