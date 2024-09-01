import React, { useEffect, useState, useContext } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/postContext';
import './View.css';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails, firebase } = useContext(PostContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails && postDetails.userId) {
        const { userId } = postDetails;
        const db = getFirestore(firebase);
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('uid', '==', userId)); // Ensure 'uid' is correct field name

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            console.log('User Data:', userData); // Check structure
            setUserDetails(userData);
          } else {
            console.log('No user found with the given ID');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        console.log('No postDetails or userId present');
      }
    };

    fetchUserDetails();
  }, [postDetails, firebase]);

  console.log('Post Details:', postDetails);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        {postDetails?.url ? (
          <img
            src={postDetails.url}
            alt={postDetails?.name || 'Product Image'}
            onError={(e) => {
              e.target.src = 'path/to/placeholder-image.jpg';
            }}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price || 'N/A'}</p>
          <span>{postDetails?.name || 'Product Name'}</span>
          <p>{postDetails?.category || 'Category'}</p>
          <span>{postDetails?.date || 'Date'}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username || 'No name'}</p>
          <p>{userDetails?.phone || '1234567890'}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
