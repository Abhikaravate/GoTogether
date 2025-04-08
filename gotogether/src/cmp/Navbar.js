// src/cmp/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#384959",
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
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>GoTogether</h2>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/home" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" style={styles.link}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" style={styles.link}>
            Contact
          </Link>
        </li>
        <li>
          <Link to="/AuthForm" style={{ textDecoration: "none" }}>
            <button style={styles.logoutButton}>Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
