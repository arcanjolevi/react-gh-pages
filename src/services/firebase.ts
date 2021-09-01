import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq1k8AWxZ4DSjHjnzsked8ejZBJinyoNA",
  authDomain: "seefleet.firebaseapp.com",
  projectId: "seefleet",
  storageBucket: "seefleet.appspot.com",
  messagingSenderId: "815101815772",
  appId: "1:815101815772:web:27e2ee02e42bfb6a5ffd19",
  measurementId: "G-4M2ZWS3T9V",
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
export { firebase, auth };
