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
    // Get logged in user data - this is just testing
    let collectionRef = firebase.database().ref("users/alex/collection");
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

  queryCardObjects(collectionData) {
    let db = firebase.database().ref("players");
    return Promise.all(
      collectionData.map(obj => {
        let cardId = obj.id;
        let cardQuantity = obj.quantity;
        return db.child(cardId).once('value')
        .then(snapshot => {
          let cardObj = snapshot.val();
          cardObj.quantity = cardQuantity;
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
      <Tile key={obj.name} colorIndex="light-1">
        <Card thumbnail='/img/carousel-1.png'
          heading={ obj.name }
          label={ obj.email }
          description={ obj.quantity + 'x' } />
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
