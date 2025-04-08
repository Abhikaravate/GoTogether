import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import background from "../assets/login.png";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const endpoint = isLogin ? "/login" : "/signup";
    const userData = isLogin
      ? { email, password }
      : { username, name, contact, email, password };

    try {
      const response = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.message === "Login successful" || data.message === "Signup successful") {
        navigate("/home");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  const sendResetPassword = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/send-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error sending reset password email.");
    }
  };

  return (
    <div style={styles.backgroundWrapper}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <div style={styles.formContainer}>
            <motion.div
              initial={{ x: isLogin ? 0 : "-100%" }}
              animate={{ x: isLogin ? "0%" : "-100%" }}
              transition={{ duration: 0.5 }}
            >
              {!isLogin ? (
                <div style={styles.form}>
                  <h2 style={styles.heading}>Signup</h2>
                  <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={styles.input} />
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
                    <input type="text" placeholder="Contact No" value={contact} onChange={(e) => setContact(e.target.value)} required style={styles.input} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={styles.input} />
                    <button type="submit" style={styles.button}>Signup</button>
                  </form>
                  <p>Already have an account? <span onClick={() => setIsLogin(true)} style={styles.link}>Login</span></p>
                </div>
              ) : (
                <div style={styles.form}>
                  <h2 style={styles.heading}>Login</h2>
                  <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
                    <button type="submit" style={styles.button}>Login</button>
                  </form>
                  <button onClick={sendResetPassword} style={styles.button}>Forgot Password?</button>
                  <p>New user? <span onClick={() => setIsLogin(false)} style={styles.link}>Signup</span></p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  backgroundWrapper: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    width: "100%",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    // backdropFilter: "blur(5px)",
    minHeight: "100vh",
    paddingBottom: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  formContainer: {
    width: "400px",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // translucent white
    backdropFilter: "blur(5px)", // blur effect
    borderRadius: "10px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.3)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#fff"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    background: "rgb(18, 18, 18)",
    color: "#000"
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer"
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline"
  },
  message: {
    textAlign: "center",
    marginTop: "10px",
    color: "green",
    fontWeight: "bold"
  }
};

export default AuthForm;
