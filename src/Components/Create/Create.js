import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../firebase/firebaseContext';
import { FirebaseContext } from '../../firebase/firebaseContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const { storage, firestore } = useContext(FirebaseContext); 
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  console.log("Firebase Storage Object:", storage);

  const handleSubmit = () => {
    if (!image) return; 

    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('File available at:', url);

          
          addDoc(collection(firestore, 'product'), {

            name,
            category,
            price,
            url,
            createdAt: new Date(), 
            userId: user.uid 
          }).then(() => {
            console.log('Product added successfully!');
             navigate('/')
          }).catch((error) => {
            console.error('Error adding product:', error);
          });
        });
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e) => setName(e.target.value)}
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e) => setCategory(e.target.value)}
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              onChange={(e) => setPrice(e.target.value)}
              name="Price"
            />
            <br />
          </form>
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
    
  );
};

export default Create;
