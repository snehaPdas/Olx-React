import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; 

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../firebase/firebaseContext';
import { FirebaseContext } from '../../firebase/firebaseContext';

function Header() {
  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login'); 
    }).catch((error) => {
      console.error('Sign out error:', error);
    });
  };

  const handleSellClick = () => {
    navigate('/create'); // Replace '/create' with the actual path to your create page
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone, and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` : 'Login'}</span>
          <hr />
        </div>
        {user && (
          <span onClick={handleLogout}>Logout</span>
        )}
        <div className="sellMenu" onClick={handleSellClick}>
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
