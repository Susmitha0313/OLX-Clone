import React, { Fragment,useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext.js';

import { useNavigate } from 'react-router-dom';

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const Create = () => {
  const [name, setName ] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice ] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('')

  const date = new Date()

  const navigate = useNavigate();

  const {auth, storage, firestore } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)

  const handleSubmit= async () =>{

    if (!name || !category || !price || !image) {
      setError('All fields are required.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError('Enter a valid Price');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!user || !user.uid) {
      setError('User is not logged in.');
      setTimeout(() => setError(''), 3000);
      navigate('/login');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(image.type)) {
      setError('Only JPEG, JPG, and PNG files are allowed.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (image){
      try {
    const storageRef = ref(storage, `/images/${image.name}`);
    console.log("Image reference created:", storageRef);

    const snapshot = await uploadBytes(storageRef, image);
    console.log('upload completed:',snapshot);

    const url = await getDownloadURL(snapshot.ref);
    
    addDoc(collection(firestore,'products'),{
      name,
      category,
      price,
      url,
      userId: user.uid,
      createdAt: date.toDateString()
    })
    navigate('/')
  } catch (error) {
    console.error("Error during upload:", error);
  }

    }else {
      console.log('Please select an image');
    }

  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" 
            value={price}
            onChange={(e)=>{
              setPrice(e.target.value)
            }} />
            <br />
         
          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image): '' } ></img>
          
            <br />
            <input
            onChange={(e)=>{
              setImage(e.target.files[0])
            }}
            type="file" 
            accept=".jpeg, .jpg, .png"
            />
            <br />
            {error&& <p style={{color:"red"}}>{error}</p>}

            <button 
            onClick={handleSubmit}
            className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
