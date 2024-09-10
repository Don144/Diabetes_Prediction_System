import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./fontawesome-free/css/all.css";
import { Button } from "./Button";
import "./NAV.css";

import { auth } from "../firebase";

function NAV() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check Firebase auth state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null); // Update user state after logout
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="title" onClick={closeMobileMenu}>
          AI DIABETES PREDICTION SYSTEM
        </Link>

        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {user && (
            <button className="btn--outline2" onClick={handleLogout}>
              Logout
            </button>
          )}
          <li>
            <Link to="/whatisD" className="title" onClick={closeMobileMenu}>
              What is Diabetes?
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NAV;
