import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

export function watchAuthData(nextState, replace) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      // No user is signed in.
      console.log('No user is signed in.');
      browserHistory.replace({
        pathname: '/login'
      });
    }
  });
}

export function login(email, pw) {
  return firebase.auth().signInWithEmailAndPassword(email, pw)
}

export function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('Sign-out successful');
  }, function(error) {
    // An error happened.
    console.log('Error logging out');
  });
}

export function register(email, pw) {
  return firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => console.log('Oops', error))
}

export function saveUser (user) {
  return firebase.database().ref().child(`users/${user.uid}`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}
