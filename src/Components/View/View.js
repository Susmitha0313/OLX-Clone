import React, {useContext, useEffect, useState, } from 'react';

import './View.css';
import { PostContext } from '../../store/Post';
import { FirebaseContext } from '../../store/FirebaseContext';

import { collection, query, where, getDocs, doc } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetail ] = useState();
  const {postDetails} = useContext(PostContext)
  const { firestore } = useContext(FirebaseContext)

  useEffect(() => {
    const { userId } = postDetails;
  
    const fetchUserDetails = async () => {
      try {
        const q = query(collection(firestore, 'users'), where('id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          setUserDetail(doc.data());
        });
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };
  
    fetchUserDetails();
  }, [postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="image not available"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
