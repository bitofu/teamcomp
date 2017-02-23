import database from './database';
import firebase from 'firebase';

export function getUserPacksAndCurrency(callback) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
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
    } else {
      callback('No user is signed in.');
    }
  });
}

export function getUserCollection(callback) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      const collectionRef = database.ref().child("users/" + uid + "/collection");

      collectionRef.once("value", (dataSnapshot) => {
        let collectionCardKeys = [];
        dataSnapshot.forEach(function(childSnapshot) {
          let cardKey = childSnapshot.key;
          collectionCardKeys.push(cardKey);
        });
        queryCardObjects(collectionCardKeys).then(cardObjs => {
          queryPlayerObjects(cardObjs).then(collectionData => {
            let collection = filterByAlphaOrder(collectionData);
            callback(collection);
          });
        });
      });
    }
  });
}

// TODO: Currently allows duplicates in decks, need to lock cards to leagues
// BUG: Only works if there max two regions
export function getUserCollectionByRegionsAndAvailablity(leagueRegions, callback) {
  getUserCollection((collectionData) => {
    let filteredCollectionByRegions = collectionData.filter((obj) => {
      return obj.League === leagueRegions[0] || obj.League === leagueRegions[1];
    });
    callback(filteredCollectionByRegions);
  });
}

export function getUserLeagues(callback) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
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
  });
}

export function isUserInLeague(leagueKey, callback) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      const userLeagueRef = database.ref("users/"+ uid + "/leagues");

      userLeagueRef.once("value").then((snapshot) => {
        let isUserLockedIn = snapshot.child(leagueKey).exists();
        callback(isUserLockedIn);
      });
    }
  });
}

export function getUserLeagueDraft(leagueKey, callback) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      const userLeagueRef = database.ref("users/"+ uid + "/leagues");

      userLeagueRef.child(leagueKey).once("value", (dataSnapshot) => {
        let draftCardKeys = [];
        dataSnapshot.forEach(function(childSnapshot) {
          let cardKey = childSnapshot.key;
          draftCardKeys.push(cardKey);
        });
        queryCardObjects(draftCardKeys).then(cardObjs => {
          queryPlayerObjects(cardObjs).then(draftData => {
            callback(draftData);
          });
        });
      });
    }
  });
}

// TODO: Refactor this function - its so shit
export function lockInUserToLeague(top, mid, jungle, adc, support, leagueKey, entryFee, callback) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      const userDataRef = database.ref().child("users/" + uid);

      userDataRef.once("value", (dataSnapshot) => {
        let userData = dataSnapshot.val();
        let userGold = userData.gold;

        if (userGold < entryFee) {
          callback('Failed');
        } else {
          let updates = {};
          let newUserGold = userGold - entryFee;
          console.log(newUserGold);
          // Update user gold
          updates['users/' + uid + '/gold'] = newUserGold;
          // Save player key in league
          updates['leagues/' + leagueKey + '/users/' + uid] = true;
          // Save cards to league
          updates['users/' + uid + '/leagues/' + leagueKey + '/' + top.cardKey] = true;
          updates['users/' + uid + '/leagues/' + leagueKey + '/' + mid.cardKey] = true;
          updates['users/' + uid + '/leagues/' + leagueKey + '/' + jungle.cardKey] = true;
          updates['users/' + uid + '/leagues/' + leagueKey + '/' + adc.cardKey] = true;
          updates['users/' + uid + '/leagues/' + leagueKey + '/' + support.cardKey] = true;
          // Save to firebase
          database.ref().update(updates).then( () => {
            callback('Success');
          });
        }
      });
    }
  })
}

export function filterCollectionByPosition(position, collection) {
  if (position === 'All Positions') return collection;
  let filteredCollection = collection.filter((obj) => {
    return obj.Position === position;
  });
  return filteredCollection;
}

export function filterCollectionByRegion(region, collection) {
  if (region === 'All Regions') return collection;
  let filteredCollection = collection.filter((obj) => {
    return obj.League === region;
  });
  return filteredCollection;
}

function filterByAlphaOrder(collectionData) {
  return collectionData.sort(function(a, b) {
    const nameA = a.Name.toLowerCase();
    const nameB = b.Name.toLowerCase();
    if (nameA < nameB) return -1; //sort string ascending
    if (nameA > nameB) return 1;
    return 0; //default return value (no sorting)
  });
}


function queryCardObjects(collectionCardKeys) {
  let db = database.ref("cards");
  return Promise.all(
    collectionCardKeys.map(cardkey => {
      return db.child(cardkey).once('value')
      .then(snapshot => {
        let cardObj = snapshot.val();
        return cardObj;
      })
    })
  ).then(res => {
    return res;
  });
}

function queryPlayerObjects(cardObjs) {
  let db = database.ref("players");
  return Promise.all(
    cardObjs.map(obj => {
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
