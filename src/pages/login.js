import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router'; // Use Next.js' router for navigation
import { auth } from '../firebase';
import '../styles/Login.css'; // Assuming you have the CSS file

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Use Next.js' router

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Navigate to dashboard on successful login
    } catch (err) {
      // Customize the error message
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid login credentials, sign up if creating a new account.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  // Handle sign-up button click
  const handleSignUp = () => {
    router.push('/signup'); // Navigate to the sign-up page
  };

  // Handle back button click
  const handleBack = () => {
    router.push('/'); // Navigate back to the homepage
  };

  return (
    <div className="login-container">
      {/* Back button */}
      <button className="back-button" onClick={handleBack}>
        ← Back
      </button>

      <h1 className="title">Breezy</h1>

      {/* Display an error message if there is one */}
      {error && (
        <div className="error-alert">
          <p>{error}</p>
        </div>
      )}

      <div className="login-box">
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label className="label">Username:</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="insert username..."
              required
            />
          </div>
          <div className="input-container">
            <label className="label">Password:</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="insert password..."
              required
            />
          </div>
          <div className="button-container">
            <button type="button" className="signup-btn" onClick={handleSignUp}>Sign Up</button>
            <button type="submit" className="login-btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
