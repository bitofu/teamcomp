import database from '../database';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

export function getPackData(callback) {
  let packDataRef = database.ref("packData");
  packDataRef.on("value", (dataSnapshot) => {
    let packData = dataSnapshot.val();
    callback(packData);
  });
}

export function purchasePack(userGold, unopenedPacks, packPrice, packQuantity) {
  // Do calcution and deduct from user funds
  if (userGold < packPrice) return;
  const newUserGold = userGold - packPrice;
  // Add packQuantity to current unopenedPacks
  const newUnopenedPacks = unopenedPacks + packQuantity;
  // Update new user funds and add card packs to user collection
  var fbUpdate = {};
  // Replace with logged in user
  fbUpdate['/users/' + currentUser.uid + '/gold'] = newUserGold;
  fbUpdate['/users/' + currentUser.uid + '/unopenedPacks'] = newUnopenedPacks;
  // save all to firebase
  database.ref().update(fbUpdate);
}

export function openPack(allPlayerKeysAndRegions, unopenedPacks, callback) {
  // Generate 5 cards for the pack
  let cardObjs = generateRanCards(allPlayerKeysAndRegions);
  // Save cards to collection
  saveCardsToCollection(cardObjs, unopenedPacks).then(packData => {
    // Query card data to send as props to next view
    queryCardObjects(packData).then(cardData => {
      callback(cardData);
    });
  });
}

function generateRanCards(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  let cardObjs = array.slice(0, 5);
  return cardObjs;
}

function saveCardsToCollection(cardObjs, unopenedPacks) {
  const currentUid = currentUser.uid;
  return Promise.all(
    cardObjs.map(playerObj => {
      let playerKey = playerObj.playerKey;
      let playerRegion = playerObj.playerRegion;
      let updates = {};
      // Push a new key for each card
      let cardKey = database.ref("users/" + currentUid + "/collection").push().key;
      // Create the update object
      let updateObj = {
        'cardKey': cardKey,
        'playerKey': playerKey,
        'playerRegion': playerRegion,
        'uid': currentUid
      };
      // Add key to user collection
      updates['/users/' + currentUid + '/collection/' + cardKey ] = true
      // Add object to cards
      updates['/cards/' + cardKey ] = updateObj
      // Save to firebase
      return database.ref().update(updates).then( () => {
        return updateObj;
      });
    })
  ).then(packData => {
    let updates = {};
    // Decrease count of unopened packs by 1
    let newUnopenedPacks = unopenedPacks - 1;
    // Set the new number of unopened packs
    updates['/users/' + currentUid + '/unopenedPacks'] = newUnopenedPacks;
    // Save to firebase
    return database.ref().update(updates).then( () => {
      return packData;
    });
  });
}

function queryCardObjects(packData) {
  let db = database.ref("players");
  return Promise.all(
    packData.map(player => {
      let playerKey = player.playerKey;
      console.log(playerKey);
      return db.child(playerKey).once('value')
      .then(snapshot => {
        return snapshot.val();
      })
    })
  ).then(res => {
    return res;
  });
}
