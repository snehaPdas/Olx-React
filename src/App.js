import './App.css';
import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Create from './Pages/Create';
import Login from './Pages/Login';
import Home from './Pages/Home';
import View from './Pages/ViewPost';
import { AuthContext, FirebaseContext } from './firebase/firebaseContext'; 
import { PostProvider } from './store/postContext'; 

function App() {
  const { setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); 
  }, [auth, setUser]);

  return (
    <PostProvider> {/* Use PostProvider here */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="create" element={<Create />} />
          <Route path="login" element={<Login />} />
          <Route path="view" element={<View />} />
        </Routes>
      </Router>
    </PostProvider>
  );
}

export default App;
