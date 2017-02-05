import React, { Component } from 'react';
import firebase from 'firebase';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Columns from 'grommet/components/Columns';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Title from 'grommet/components/Title';
import Label from 'grommet/components/Label';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import LockIcon from 'grommet/components/icons/base/Lock';

class League extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
      top: null,
      mid: null,
      jungle: null,
      adc: null,
      support: null,
      team: null,
      coach: null,
      retired: null,
      subOne: null,
      subTwo: null,
      buffOne: null,
      buffTwo: null
    };
    this._draftPlayer = this._draftPlayer.bind(this);
    this._removePlayer = this._removePlayer.bind(this);
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

  _draftPlayer(player, event) {
    event.preventDefault();
    this.setState({
      top: player
    });
  }

  _removePlayer(position, event) {
    event.preventDefault();
    this.setState({
      top: null
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

  renderDraftList() {
    const {
      top,
      mid,
      jungle,
      adc,
      support,
      team,
      coach,
      retired,
      subOne,
      subTwo,
      buffOne,
      buffTwo
    } = this.state;
    return (
      <List selectable={false}>
        {/* Top */}
        {(top === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Top
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                { top.name }
              </span>
              <span className='secondary'>
                Active player
              </span>
              <Anchor className='secondary'
                      onClick={this._removePlayer.bind(this, 'top')}>
                Remove
              </Anchor>
            </ListItem>
        }
        {/* Mid */}
        {(mid === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Mid
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Mid
              </span>
              <span className='secondary'>
                Active player
              </span>
            </ListItem>
        }
        {/* Jungle */}
        {(jungle === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Jungle
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Jungle
              </span>
              <span className='secondary'>
                Active player
              </span>
            </ListItem>
        }
        {/* ADC */}
        {(adc === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                ADC
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                ADC
              </span>
              <span className='secondary'>
                Active player
              </span>
            </ListItem>
        }
        {/* Support */}
        {(support === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Support
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Support
              </span>
              <span className='secondary'>
                Active player
              </span>
            </ListItem>
        }
        {/* Team */}
        {(team === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Team
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Team
              </span>
              <span className='secondary'>
                Active player
              </span>
            </ListItem>
        }
        {/* Coach */}
        {(coach === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Coach
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Coach
              </span>
              <span className='secondary'>
                Active player
              </span>
            </ListItem>
        }
        {/* Retired */}
        {(retired === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Retired
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Retired
              </span>
              <span className='secondary'>
                Active player
              </span>
            </ListItem>
        }
        {/* Sub #1 */}
        {(subOne === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Sub #1
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Sub #1
              </span>
              <span className='secondary'>
                Active player
              </span>
            </ListItem>
        }
        {/* Sub #2 */}
        {(subTwo === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Sub #2
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Sub #2
              </span>
              <span className='secondary'>
                Active player
              </span>
            </ListItem>
        }
        {/* Buff #1 */}
        {(buffOne === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Buff #1
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Buff #1
              </span>
              <span className='secondary'>
                Active player
              </span>
            </ListItem>
        }
        {/* Buff #2 */}
        {(buffTwo === null)
          ? <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Buff #2
              </span>
              <span className='secondary'>
                No active player
              </span>
            </ListItem>
          : <ListItem justify='between'
                      separator='horizontal'>
              <span>
                Buff #2
              </span>
              <span className='secondary'>
                Active player
              </span>
            </ListItem>
        }
      </List>
    );
  }

  render() {
    // Need to query card objects before rendering
    const { collection } = this.state;
    const listCollection = (collection === null) ? 'No cards in collection' : collection.map((obj) =>
      <Tile key={obj.cardKey}
            colorIndex="light-1"
            onClick={this._draftPlayer.bind(this, obj)}>
        <Card thumbnail='/img/carousel-1.png'
          heading={ obj.name }
          label={ obj.email }
          description={ 'Card key ' + obj.cardKey } />
      </Tile>
    );

    return (
      <Box>
        {/* League Details */}
        <Box colorIndex='accent-2'
             pad='medium'>
          <Box flex={true}
              direction='row'
              responsive={true}>
            <Box size={{width: {min: 'medium'}}}
                 flex={true}>
              <Heading tag='h3'>$40K Sat NBA Dime (Single Entry Series Pres. By RotoGrinders)</Heading>
              Details
            </Box>
            <Box size={{width: {min: 'medium'}}}
                 align='end'>
              Contest starts Sat 7:00pm ET
            </Box>
          </Box>
        </Box>
        {/* Main body */}
        <Box flex={true}
             direction='row'
             responsive={true}>
          {/* Left column */}
          <Box size={{width: {min: 'medium'}}}
               flex={true}
               pad='medium'>
            <Tiles selectable={true}
               fill={false}
               flush={false}>
              { listCollection }
            </Tiles>
          </Box>
          {/* Right column */}
          <Box size={{width: {min: 'large'}}}
               separator='left'>
            <Box direction='row'
               responsive={true}
               pad='medium'>
              <Box flex={true}>
               <Title>Your Lineup</Title>
               Lineup locks @ Sat 7:00pm
              </Box>
              <Box align='end'>
               <Title>$60,000 / $100,000</Title>
              </Box>
            </Box>
            { this.renderDraftList() }
            <Box direction='row'
               responsive={true}
               pad='medium'>
              <Box flex={true}>
               Details
              </Box>
              <Box align='end'>
                <Button icon={<LockIcon />}
                  label='Lock In'
                  href='#'
                  primary={true}
                  secondary={false}
                  accent={false}
                  plain={false} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default League;
