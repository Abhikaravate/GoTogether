from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/gotogether"
mongo = PyMongo(app)


# ✅ Signup Route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")

    if mongo.db.users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    mongo.db.users.insert_one(data)
    return jsonify({"message": "Signup successful!"}), 201


# ✅ Login Route
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

    return jsonify({
        "message": "Login successful",
        "user": {
            "email": user["email"],
            "name": user["name"],
            "contact": user["contact"]
        }
    })


# ✅ Submit Ride
@app.route("/api/rides", methods=["POST"])
def add_ride():
    data = request.json
    mongo.db.rides.insert_one(data)
    return jsonify({"message": "Ride added successfully"}), 201


# ✅ Get All Rides
@app.route("/api/rides", methods=["GET"])
def get_rides():
    rides = []
    for ride in mongo.db.rides.find():
        ride["_id"] = str(ride["_id"])
        rides.append(ride)
    return jsonify(rides)


# ✅ Update Ride
@app.route("/api/rides/<ride_id>", methods=["PUT"])
def update_ride(ride_id):
    data = request.json
    mongo.db.rides.update_one({"_id": ObjectId(ride_id)}, {"$set": data})
    return jsonify({"message": "Ride updated"})


# ✅ Delete Ride
@app.route("/api/rides/<ride_id>", methods=["DELETE"])
def delete_ride(ride_id):
    mongo.db.rides.delete_one({"_id": ObjectId(ride_id)})
    return jsonify({"message": "Ride deleted"})


if __name__ == "__main__":
    app.run(debug=True)
