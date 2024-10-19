import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Login from '../components/Login'; 
import Dashboard from '../components/Dashboard'; 
import TinkermanSlide from '../components/TinkermanSlide'; 
import '../styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route for home page */}
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <Features />
              <Testimonials />
              <Footer />
            </>
          } />

          {/* Route for login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for dashboard page */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tinkermanSlide" element={<TinkermanSlide />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
