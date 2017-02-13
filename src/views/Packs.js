import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import firebase from 'firebase';
import Box from 'grommet/components/Box';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Headline from 'grommet/components/Headline';

// use this for animation transitions
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// reimplement using react-slick center mode
// import Slider from 'react-slick';

class Packs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unopenedPacks: 0,
      allPlayerKeysAndRegions: [],
      currentUid: null
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        let currentUid = user.uid;
        this.setState({
          currentUid: currentUid
        });

        // Get logged in user data - this is just testing
        let userDataRef = firebase.database().ref("users/" + currentUid);
        userDataRef.once("value", function(dataSnapshot) {
          let userData = dataSnapshot.val();
          this.setState({
            unopenedPacks: userData.unopenedPacks
          });
        }.bind(this));

        // Stores all player keys in state for pack generating
        let playerDataRef = firebase.database().ref("players");
        playerDataRef.once("value", function(dataSnapshot) {
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
          this.setState({
            allPlayerKeysAndRegions: allPlayerKeysAndRegions
          });
        }.bind(this));
      }
    });
  }

  generateRanCards(array) {
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

  saveCardsToCollection(cardObjs, unopenedPacks) {
    const { currentUid } = this.state;

    return Promise.all(
      cardObjs.map(playerObj => {
        let playerKey = playerObj.playerKey;
        let playerRegion = playerObj.playerRegion;

        let updates = {};

        let cardKey = firebase.database().ref("users/" + currentUid + "/collection").push().key;

        let updateObj = {
          'cardKey': cardKey,
          'playerKey': playerKey,
          'playerRegion': playerRegion
        };

        updates['/users/' + currentUid + '/collection/' + cardKey ] = updateObj

        firebase.database().ref().update(updates);

        return updateObj;
      })
    ).then(packData => {
      console.log(packData);

      let updates = {};

      // Decrease count of unopened packs by 1
      let newUnopenedPacks = unopenedPacks - 1;

      updates['/users/' + currentUid + '/unopenedPacks'] = newUnopenedPacks;

      firebase.database().ref().update(updates);

      return packData;
    });
  }

  queryCardObjects(packData) {
    let db = firebase.database().ref("players");
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

  _onClickPack(id, event) {
    event.preventDefault();

    const { allPlayerKeysAndRegions, unopenedPacks } = this.state;
    // Generate 5 cards for the pack
    let cardObjs = this.generateRanCards(allPlayerKeysAndRegions);
    // Save cards to collection
    this.saveCardsToCollection(cardObjs, unopenedPacks).then(packData => {
      // Query card data to send as props to next view
      this.queryCardObjects(packData).then(cardData => {
        console.log(cardData);
        // Using hack-y temp solution to save cardData into localstorage, so that the pack opening view can retrieve
        localStorage.setItem('cardsInPack', JSON.stringify(cardData));
        browserHistory.push('/openpack/' + id);
      });
    });
  }

  render() {
    const { unopenedPacks } = this.state;
    const listPacks = [];
    for(let i = 0; i < unopenedPacks; i++) {
      listPacks.push(
        (
          <Tile key={i}
                onClick={this._onClickPack.bind(this, i)} >
            <Card thumbnail='https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/packs%2Fleagueoflegends.jpg?alt=media'
              className="card-pack"
              margin="small"
              contentPad="large"
              direction="column"
              heading='Classic Pack'
              label='League of Legends'
              description='5 Cards' />
          </Tile>
        )
      );
    }
    if (unopenedPacks === 0) {
      return (
        <Box justify="center" align="center" full={true}>
          <Headline strong={false}
            size='medium'>
            You have no unopened packs
          </Headline>
        </Box>
      );
    } else {
      return (
        <Box full={true} colorIndex="light-2">
          <Tiles selectable={false}
            fill={true}
            flush={false} >
            { listPacks }
          </Tiles>
        </Box>
      );
    }
  }
}

export default Packs;
