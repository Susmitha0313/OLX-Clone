import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from "firebase/firestore";

import { PostContext } from '../../store/Post';
import { FirebaseContext } from '../../store/FirebaseContext';

import { useNavigate } from 'react-router-dom';

import Heart from '../../assets/Heart';
import './Post.css';


function Posts() {
  const { firestore } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);

  const Navigate = useNavigate();

  const { setPostDetails } = useContext(PostContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "products"));
        const allPosts = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setProducts(allPosts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [firestore]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => {
            return <div
              className="card"
              onClick={() => {
                setPostDetails(product)
                Navigate('/viewpost')
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map(product => {
            return <div className="card" onClick={() => {
              setPostDetails(product)
              Navigate('/viewpost')
            }}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="image" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          })
          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
