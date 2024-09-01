import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase/firebaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const validateInput = (input) => {
    return input.trim().length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateInput(email) || !validateInput(password)) {
      setError("Email and password cannot be blank or contain only spaces.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); 
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError("The email address is badly formatted.");
          break;
        case 'auth/user-not-found':
          setError("No user found with this email address.");
          break;
        case 'auth/wrong-password':
          setError("Incorrect password. Please try again.");
          break;
        case 'auth/invalid-credential':
          setError("The credentials provided are invalid. Please check your email and password.");
          break;
        default:
          setError("Error during login: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <br />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
