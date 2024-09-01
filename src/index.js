import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
// import { FirebaseContext } from './store/firebaseContext';
import Context from './firebase/firebaseContext'
// import { firestore, auth } from './firebase/config'; 

const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
//   <FirebaseContext.Provider value={{ auth, firestore }}>
    <Context>
    <App />
    </Context>
//   </FirebaseContext.Provider>
);
