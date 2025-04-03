import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>My App</h2>
        <ul style={styles.navLinks}>
          <li><a href="#" style={styles.link}>Home</a></li>
          <li><a href="#" style={styles.link}>About</a></li>
          <li><a href="#" style={styles.link}>Contact</a></li>
          <li><button style={styles.logoutButton}>Logout</button></li>
        </ul>
      </nav>

      {/* Home Page Content */}
      <div style={styles.container}>
        <h1>Welcome to the Home Page</h1>
        <p>This is a simple homepage with a navigation bar.</p>
      </div>
    </div>
  );
};

// Styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: "10px 20px",
    color: "white",
  },
  logo: { margin: 0 },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    border: "none",
    padding: "8px 12px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
  },
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "20px",
  },
};

export default HomePage;
