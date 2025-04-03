from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/gotogether"
mongo = PyMongo(app)

# ✅ Signup Route (No Email Verification)
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    name = data.get("name")
    contact = data.get("contact")
    password = data.get("password")

    if mongo.db.users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    mongo.db.users.insert_one({
        "username": username,
        "email": email,
        "name": name,
        "contact": contact,
        "password": password
    })

    return jsonify({"message": "Signup successful!"}), 201

# ✅ Login Route (No Verification Check)
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = mongo.db.users.find_one({"email": email})

    if not user:
        return jsonify({"message": "User not found"}), 404
    if user["password"] != password:
        return jsonify({"message": "Incorrect password"}), 401

    return jsonify({"message": "Login successful"}), 200

if __name__ == "__main__":
    app.run(debug=True)
