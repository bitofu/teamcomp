import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDZGQ_J3rRDhIAJlmwFsn_e7az1Uwpbvt0",
  authDomain: "teamcomp-fecc4.firebaseapp.com",
  databaseURL: "https://teamcomp-fecc4.firebaseio.com",
  storageBucket: "teamcomp-fecc4.appspot.com"
};
firebase.initializeApp(config);
const database = firebase.database();

export default database;
