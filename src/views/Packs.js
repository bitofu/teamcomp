import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import firebase from 'firebase';
import Box from 'grommet/components/Box';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';

// use this for animation transitions
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// reimplement using react-slick center mode
// import Slider from 'react-slick';

class Packs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unopenedPacks: 0,
      allPlayerKeys: [],
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
          let allPlayerKeys = [];
          dataSnapshot.forEach(function(childSnapshot) {
            let playerKey = childSnapshot.key;
            allPlayerKeys.push(playerKey);
          });
          this.setState({
            allPlayerKeys: allPlayerKeys
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
    let cardKeys = array.slice(0, 5);
    return cardKeys;
  }

  saveCardsToCollection(cardKeys, unopenedPacks) {
    const { currentUid } = this.state;

    let collectionRef = firebase.database().ref("users/" + currentUid + "/collection");
    return Promise.all(
      cardKeys.map(playerKey => {
        return collectionRef.child(playerKey).once('value')
        .then(snapshot => {
          let updates = {};

          let cardKey = firebase.database().ref("users/" + currentUid + "/collection").push().key;

          updates['/users/' + currentUid + '/collection/' + cardKey ] = {
            'cardKey': cardKey,
            'playerKey': playerKey,
          };

          firebase.database().ref().update(updates);

          return snapshot.val();
        })
      })
    ).then(res => {
      console.log(res);

      let updates = {};

      // Decrease count of unopened packs by 1
      let newUnopenedPacks = unopenedPacks - 1;

      updates['/users/' + currentUid + '/unopenedPacks'] = newUnopenedPacks;

      firebase.database().ref().update(updates);

      return 'Success';
    });
  }

  queryCardObjects(cardIds) {
    let db = firebase.database().ref("players");
    return Promise.all(
      cardIds.map(id => {
        return db.child(id).once('value')
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

    const { allPlayerKeys, unopenedPacks } = this.state;
    // Generate 5 cards for the pack
    let cardKeys = this.generateRanCards(allPlayerKeys);
    // Save cards to collection
    this.saveCardsToCollection(cardKeys, unopenedPacks).then(res => {
      // Query card data to send as props to next view
      this.queryCardObjects(cardKeys).then(cardData => {
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
                colorIndex="light-1"
                onClick={this._onClickPack.bind(this, i)} >
            <Card thumbnail='/img/carousel-1.png'
              direction="column"
              heading='Classic'
              label='League of Legends'
              description='Classic Pack' />
          </Tile>
        )
      );
    }

    return (
      <Box colorIndex="light-2">
        <Tiles selectable={true}
          fill={false}
          flush={false} >
          { listPacks }
        </Tiles>
      </Box>
    );
  }
}

export default Packs;
