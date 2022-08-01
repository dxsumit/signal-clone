// firebase 
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBqvsSaBUZZIU6aCaD-gh1FUvJg_hynwgM",
  authDomain: "signal-clone-18b3e.firebaseapp.com",
  projectId: "signal-clone-18b3e",
  storageBucket: "signal-clone-18b3e.appspot.com",
  messagingSenderId: "786906366436",
  appId: "1:786906366436:web:b289ef77100c8b03f807f1"
};


// Initialize Firebase
let app;
if(getApps().length === 0){
  app = initializeApp(firebaseConfig);

} else {
  app = getApp();
} 


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);






  