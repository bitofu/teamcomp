import database from './database';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const uid = currentUser.uid;

export function getUserPacksAndCurrency(callback) {
  const userDataRef = database.ref().child("users/" + uid);

  userDataRef.on("value", (dataSnapshot) => {
    let userData = dataSnapshot.val();
    let userObj = {
      uid: uid,
      gold: userData.gold,
      silver: userData.silver,
      unopenedPacks: userData.unopenedPacks,
    }

    callback(userObj)
  });
}

export function getUserCollection(callback) {
  const collectionRef = database.ref().child("users/" + uid + "/collection");

  collectionRef.once("value", (dataSnapshot) => {
    let collection = [];
    dataSnapshot.forEach(function(childSnapshot) {
      let collectionData = childSnapshot.val();
      collection.push(collectionData);
    });
    queryCollectionCardObjects(collection).then(collectionData => {
      callback(collectionData);
    });
  });
}

export function getUserLeagues(callback) {
  const userLeaguesRef = database.ref().child("users/" + uid + "/leagues");

  userLeaguesRef.once("value", (dataSnapshot) => {
    let myLeagues = [];
    dataSnapshot.forEach((childSnapshot) => {
      let leagueKey = childSnapshot.key;
      myLeagues.push(leagueKey);
    });
    queryLeagueObjects(myLeagues).then((myLeagueData) => {
      callback(myLeagueData);
    });
  });
}

export function isUserInLeague(leagueKey, callback) {
  const userLeagueRef = database.ref("users/"+ uid + "/leagues");

  userLeagueRef.once("value").then((snapshot) => {
    let isUserLockedIn = snapshot.child(leagueKey).exists();
    callback(isUserLockedIn);
  });
}

export function getUserLeagueDraft(leagueKey, callback) {
  const userLeagueRef = database.ref("users/"+ uid + "/leagues");

  userLeagueRef.child(leagueKey).once("value", (dataSnapshot) => {
    let userLeagueDraft = dataSnapshot.val();
    callback(userLeagueDraft);
  });
}

function queryCollectionCardObjects(collectionData) {
  let db = database.ref("players");
  return Promise.all(
    collectionData.map(obj => {
      let playerKey = obj.playerKey;
      let cardKey = obj.cardKey;
      return db.child(playerKey).once('value')
      .then(snapshot => {
        let cardObj = snapshot.val();
        cardObj.cardKey = cardKey;
        return cardObj;
      })
    })
  ).then(res => {
    return res;
  });
}

function queryLeagueObjects(myLeagues) {
  let db = database.ref("leagues");
  return Promise.all(
    myLeagues.map(leagueKey => {
      return db.child(leagueKey).once('value')
      .then(snapshot => {
        return snapshot.val();
      })
    })
  ).then(res => {
    return res;
  });
}
