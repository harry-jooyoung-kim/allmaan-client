const firebase = require('firebase');

export const firebaseInit = () =>{
  const config = {
    apiKey: "AIzaSyBg0MGqIDCetQ6zVsafJ_uIVO_lEkwfEh0",
    authDomain: "allmaan-api.firebaseapp.com",
    databaseURL: "https://allmaan-api.firebaseio.com",
    projectId: "allmaan-api",
    storageBucket: "allmaan-api.appspot.com",
    messagingSenderId: "488033288499"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings( { timestampsInSnapshots: true });
};
