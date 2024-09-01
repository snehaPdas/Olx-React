import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase/firebaseContext';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, firestore } = useContext(FirebaseContext); 
  const navigate = useNavigate();

  
  const phoneRegex = /^[0-9]{10}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

  
    if (!username || !email || !phone || !password) {
      setError("Please fill in all fields.");
      
      setLoading(false);
      return;
    }

    
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created", result.user);
      
      await updateProfile(result.user, { displayName: username });
      
      const userCollectionRef = collection(firestore, 'users');
      await addDoc(userCollectionRef, {
        uid: result.user.uid,
        username: username,
        email: email,
        phone: phone,
        createdAt: new Date().toISOString(),
      });

      console.log("User created and profile updated:", result.user);
      navigate('/login');
      
    } catch (error) {
      setError("Error during sign up: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="text" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            placeholder="Enter your 10-digit phone number"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Signup"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
