import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDZVQ-x6KLAt1pbhR9nWEvek9auN46ByGs",
  authDomain: "loginpage-d633b.firebaseapp.com",
  projectId: "loginpage-d633b",
  storageBucket: "loginpage-d633b.appspot.com",
  messagingSenderId: "906388509407",
  appId: "1:906388509407:web:dd7d57981b50bf58a5cf6a"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
