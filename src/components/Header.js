import React from 'react';
import '../styles/Header.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Breezy</div>
      <div className="header-buttons">
        <Link href="../pages/login.js">
          <button className="login-btn">Login</button>
        </Link>

        <Link href="../pages/signup.js">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
