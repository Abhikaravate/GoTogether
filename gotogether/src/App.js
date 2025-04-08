// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./cmp/home";
import About from "./cmp/about";
import Contact from "./cmp/contact";
import AuthForm from "./cmp/AuthForm";
import Navbar from "./cmp/Navbar";
import LandingPage from "./cmp/LandingPage";

const AppWrapper = () => {
  const location = useLocation();

  // Show navbar only on these pages
  const showNavbar = ["/home", "/about", "/contact"].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element= {<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AuthForm" element={<AuthForm />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
