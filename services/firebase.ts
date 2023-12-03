// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA9Fg-K9uV_3GQfZ2hZuYMjX54Y8kN1l0",
  authDomain: "agendamento-35f8f.firebaseapp.com",
  databaseURL: "https://agendamento-35f8f-default-rtdb.firebaseio.com",
  projectId: "agendamento-35f8f",
  storageBucket: "agendamento-35f8f.appspot.com",
  messagingSenderId: "61585316562",
  appId: "1:61585316562:web:aae2fe7fee74b333aaeb0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export {app};
