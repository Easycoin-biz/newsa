const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getDatabase } = require('firebase/database');
const { getStorage } = require('firebase/storage');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuZVnVnt0M-PcSNgPOtlpD7AxSF-U68MQ",
  authDomain: "easy-588b2.firebaseapp.com",
  databaseURL: "https://easy-588b2-default-rtdb.firebaseio.com",
  projectId: "easy-588b2",
  storageBucket: "easy-588b2.appspot.com",
  messagingSenderId: "578034132337",
  appId: "1:578034132337:web:44210eecf7ae10c97042d0",
  measurementId: "G-JVW0YNZEE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);
const db = getDatabase(app);
// const storage = getStorage(app);

exports.db = db;

