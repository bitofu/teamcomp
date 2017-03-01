import database from '../database';

export function getLeagues(type, callback) {
  let leaguesRef = database.ref("leagues").orderByChild("leagueType").equalTo(type);

  leaguesRef.once("value", (dataSnapshot) => {
    let leagues = [];
    dataSnapshot.forEach(function(childSnapshot) {
      let leagueData = childSnapshot.val();
      leagues.push(leagueData);
    });

    callback(leagues);
  });
}

export function getLeagueData(leagueKey, callback) {
  let leaguesRef = database.ref("leagues/" + leagueKey);

  leaguesRef.once("value", (dataSnapshot) => {
    let leagueData = dataSnapshot.val();
    callback(leagueData);
  });
}
