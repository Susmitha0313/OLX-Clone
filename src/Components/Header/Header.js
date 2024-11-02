import React, { useContext } from 'react';

import { AuthContext } from '../../store/FirebaseContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { signOut } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';

function Header() {

  const { user } = useContext(AuthContext)
  const { auth } = useContext(FirebaseContext)
  const navigate = useNavigate();

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` : <span onClick={() => {
            navigate('/login')
          }}>Login</span>}</span>
          <hr />
        </div>

        {user && <span
          onClick={() => {
            signOut(auth).then(() => {
              console.log('successfully logged out');
              navigate('/login')
            }).catch((error) => {
              console.log(error.message)
            })
          }}
          style={{ cursor: "pointer" }}
        >Logout</span>}

        <div className="sellMenu" onClick={() => {
          navigate('/create')
        }}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
