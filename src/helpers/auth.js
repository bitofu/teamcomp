import firebase from 'firebase';

export function auth (email, pw) {
  return firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => console.log('Oops', error))
}

export function logout () {
  return firebase.auth().signOut()
}

export function login (email, pw) {
  return firebase.auth().signInWithEmailAndPassword(email, pw)
}

export function saveUser (user) {
  return firebase.database().ref().child(`users/${user.uid}`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}
