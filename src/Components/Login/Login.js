import Logo from '../../olx-logo.png';
import './Login.css';

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseContext } from '../../store/FirebaseContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext)

  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);

      navigate('/');

    } catch (error) {
      console.log(error.code)
      setError('Invalid credentials');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="pswd"
            name="empasswordail"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button>Login</button>
          <p>Don't have an account?<a onClick={() => {
            navigate('/signup')
          }}>Signup</a></p>
        </form>

      </div>
    </div>
  );
}

export default Login;
