import React from 'react';
import '../styles/Header.css';
import Link from 'next/link';
import Head from 'next/head';

const Header = () => {
  return (
    <header className="header">
        <div className="logo">Breezy</div>
        <div className="header-buttons">
          <Link href="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link href="/signup">
            <button className="signup-btn">Sign Up</button>
          </Link>
        </div>
      </header>
  );
};

export default Header;
