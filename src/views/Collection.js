import React, { Component } from 'react';
import firebase from 'firebase';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        let currentUid = user.uid;

        let collectionRef = firebase.database().ref("users/" + currentUid + "/collection");
        collectionRef.once("value", function(dataSnapshot) {
          let collection = [];
          dataSnapshot.forEach(function(childSnapshot) {
            let collectionData = childSnapshot.val();
            collection.push(collectionData);
          });
          this.queryCardObjects(collection).then(data => {
            this.setState({
              collection: data
            });
          });
        }.bind(this));
      }
    });
  }

  queryCardObjects(collectionData) {
    let db = firebase.database().ref("players");
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

  render() {
    // Need to query card objects before rendering
    const { collection } = this.state;
    const listCollection = (collection === null) ? 'No cards in collection' : collection.map((obj) =>
      <Tile key={obj.cardKey} colorIndex="light-1">
        <Card thumbnail='/img/carousel-1.png'
          heading={ obj.name }
          label={ obj.email }
          description={ 'Card key ' + obj.cardKey } />
      </Tile>
    );

    return (
      <Box colorIndex="light-2">
        <Tiles selectable={true}
          fill={false}
          flush={false}>
          { listCollection }
        </Tiles>
      </Box>
    );
  }
}

export default Collection;
