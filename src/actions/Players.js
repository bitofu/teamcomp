import database from './database';

export function getAllPlayerKeysAndRegions(callback) {
  const playerDataRef = database.ref("players");

  playerDataRef.once("value", (dataSnapshot) => {
    let allPlayerKeysAndRegions = [];

    dataSnapshot.forEach(function(childSnapshot) {
      let playerKey = childSnapshot.key;
      let playerRegion = childSnapshot.val().League;

      let playerKeysAndRegions = {
        playerKey: playerKey,
        playerRegion: playerRegion
      };

      allPlayerKeysAndRegions.push(playerKeysAndRegions);
    });

    callback(allPlayerKeysAndRegions);
  });
}
