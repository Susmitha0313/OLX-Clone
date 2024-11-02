import React,{useContext, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';

import Post from './store/Post.js';
import {AuthContext} from './store/FirebaseContext.js';
import { FirebaseContext } from './store/FirebaseContext.js';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import Create from './Pages/Create.js';
import ViewPost from './Pages/ViewPost.js';

function App() {
  const {setUser} = useContext(AuthContext)
  const {auth} = useContext(FirebaseContext)

  useEffect(()=>{
   onAuthStateChanged(auth, (user) => {
    if(user){
      setUser(user);
      const uid = user.uid;
    }
   }) 
   
  })

  return (
    <div>
        <Post>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/viewpost" element={<ViewPost/>} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
