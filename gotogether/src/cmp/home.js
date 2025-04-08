import React, { useEffect, useState } from "react";
import axios from "axios";
import autoRikshaw from "../assets/background.jpg";

const HomePage = () => {
  const [rideData, setRideData] = useState([]);
  const [myRides, setMyRides] = useState([]);
  const [formData, setFormData] = useState({ from: "", to: "" });
  const [editingRideId, setEditingRideId] = useState(null);

  // Replace this with actual user data after login
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    contact: ""
  });
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  
  const fetchRides = () => {
    axios.get("http://localhost:5000/api/rides")
      .then((res) => {
        const allRides = res.data;
        setRideData(allRides);
        const myBooked = allRides.filter((ride) => ride.email === currentUser.email);
        setMyRides(myBooked);
      })
      .catch((err) => console.error("Error fetching rides", err));
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleSubmit = () => {
    const payload = {
      ...formData,
      email: currentUser.email,
      name: currentUser.name,
      contact: currentUser.contact,
    };

    if (editingRideId) {
      axios.put(`http://localhost:5000/api/rides/${editingRideId}`, payload)
        .then(() => {
          setEditingRideId(null);
          setFormData({ from: "", to: "" });
          fetchRides();
        });
    } else {
      axios.post("http://localhost:5000/api/rides", payload)
        .then(() => {
          setFormData({ from: "", to: "" });
          fetchRides();
        });
    }
  };

  const handleEdit = (ride) => {
    setFormData({ from: ride.from, to: ride.to });
    setEditingRideId(ride._id);
  };

  const handleDelete = (rideId) => {
    axios.delete(`http://localhost:5000/api/rides/${rideId}`)
      .then(() => {
        fetchRides();
      });
  };

  return (
    <div style={styles.backgroundWrapper}>
      <div style={styles.overlay}>
        <div style={styles.mainContent}>
          {/* Input Form */}
          <div style={styles.leftWindow}>
            <h3>{editingRideId ? "Edit Your Ride" : "Enter Your Travel Details"}</h3>
            <input
              type="text"
              placeholder="Starting Point"
              value={formData.from}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Destination Point"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              style={styles.input}
            />
            <button onClick={handleSubmit} style={styles.submitButton}>
              {editingRideId ? "Update Ride" : "Submit"}
            </button>
          </div>

          {/* Rides Section */}
          <div style={styles.rightSide}>
            <div style={styles.rightWindow}>
              <h3>Recent Rides</h3>
              {rideData.map((ride, index) => (
                <div key={index} style={styles.rideBox}>
                  <p><strong>Name:</strong> {ride.name}</p>
                  <p><strong>Contact:</strong> {ride.contact}</p>
                  <p><strong>From:</strong> {ride.from}</p>
                  <p><strong>To:</strong> {ride.to}</p>
                </div>
              ))}
            </div>

            <div style={styles.bookedWindow}>
              <h3>Your Booked Rides</h3>
              {myRides.map((ride, index) => (
                <div key={index} style={styles.rideBox}>
                  <p><strong>Name:</strong> {ride.name}</p>
                  <p><strong>Contact:</strong> {ride.contact}</p>
                  <p><strong>From:</strong> {ride.from}</p>
                  <p><strong>To:</strong> {ride.to}</p>
                  <button onClick={() => handleEdit(ride)} style={{ marginRight: "10px" }}>Edit</button>
                  <button onClick={() => handleDelete(ride._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backgroundWrapper: {
    backgroundImage: `url(${autoRikshaw})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    width: "100%",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.24)",
    minHeight: "100vh",
    paddingBottom: "40px",
  },
  mainContent: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: "40px",
    flexWrap: "wrap",
  },
  leftWindow: {
    width: "40%",
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f0f8ffcc",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
  rightWindow: {
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff8f0cc",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    maxHeight: "400px",
    overflowY: "auto",
  },
  bookedWindow: {
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#e8fdf8cc",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxHeight: "400px",
    overflowY: "auto",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#384959",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  rideBox: {
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    backgroundColor: "#ffffffee",
  },
};

export default HomePage;
