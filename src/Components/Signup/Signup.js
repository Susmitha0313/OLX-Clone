import React, { useState, useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';

import { FirebaseContext } from '../../store/FirebaseContext';
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';



export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [error, setError] = useState('')


  const { firestore, auth } = useContext(FirebaseContext)
  // Initialize Cloud Firestore and get a reference to the service


  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
    if (!username || !email || !phone || !password) {
      setError('Please fill all the fields');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    if (/^-/.test(username)) {
      setError('Username cannot be a negative number');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (parseInt(phone) < 0 || phone.length !== 10) {
      setError('Please enter a valid phone number');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setError('Password must contain at least one special character.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, { displayName: username });

      const docRef = await addDoc(collection(firestore, "users"), {
        id: userCredential.user.uid,
        username: username,
        phone: phone
      });

      console.log('Document written with ID: ', docRef.id);

      navigate('/login');

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message; // Note: it should be error.message, not error.Message
      console.log(errorCode, errorMessage);
    }

  }

  return (
    <div className='outerDiv'>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>}


          <button>Signup</button>
          <p>Already have an account ?
            <a style={{cursor:"pointer"}} onClick={() => {
              navigate('/login')
            }}>Login</a>
          </p>

        </form>
      </div>
    </div>
  );
}
