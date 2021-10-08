import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from "firebase/app";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: "AIzaSyBFlqhDCONTKAJnKl34RRBz6ugsR5TFcf4",
  authDomain: "movie-mania-59709.firebaseapp.com",
  databaseURL: "https://movie-mania-59709-default-rtdb.firebaseio.com",
  projectId: "movie-mania-59709",
  storageBucket: "movie-mania-59709.appspot.com",
  messagingSenderId: "352802310553",
  appId: "1:352802310553:web:0101c4e69c2c92c01b2b08"
};

const firebase = initializeApp(firebaseConfig);
export default firebase;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
