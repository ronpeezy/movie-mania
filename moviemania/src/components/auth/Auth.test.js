import { render } from '@testing-library/react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Auth from './Auth';

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

describe('Auth', () => {
  it('can log in with confirmed account', () => {
    render(<Auth />);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, 'test@test.com', 'Test1234')
    .then((userCredential) => {
        expect(userCredential).toBeTruthy();
    })
    .catch((error) => {});
  });
})