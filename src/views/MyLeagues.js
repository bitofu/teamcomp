import React, { Component } from 'react';
import firebase from 'firebase';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

class MyLeagues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLeagues: null,
      isViewReady: false
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        let currentUid = user.uid;

        let userLeaguesRef = firebase.database().ref("users/" + currentUid + "/leagues");
        userLeaguesRef.once("value", function(dataSnapshot) {
          let myLeagues = [];
          dataSnapshot.forEach((childSnapshot) => {
            let leagueKey = childSnapshot.key;
            myLeagues.push(leagueKey);
          });
          this.queryLeagueObjects(myLeagues).then((res) => {
            this.setState({
              myLeagues: res,
              isViewReady: true
            });
          });
        }.bind(this));
      }
    });
  }

  queryLeagueObjects(myLeagues) {
    let db = firebase.database().ref("leagues");
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

  renderMyLeagues() {
    const { myLeagues } = this.state;
    if (myLeagues === null || myLeagues.length === 0) {
      return (
        'You are currently in no leagues'
      );
    } else {
      const listMyLeagues = myLeagues.map((league) => {
        return (
          <Tile key={league.leagueKey} >
            <Card
              margin="small"
              contentPad="large"
              direction="column"
              label={ "Type: " + league.gameType }
              link={
                <Anchor path={"/league/" + league.leagueKey } label="Enter"
                  icon={<LinkNextIcon />} />
              }>
              <Heading tag="h2">
                { league.title }
              </Heading>
            </Card>
          </Tile>
        );
      });

      return (
        <Tiles selectable={false}
          fill={false}
          flush={false} >
          { listMyLeagues }
        </Tiles>
      );
    }
  }

  render() {
    const { isViewReady } = this.state;
    if (isViewReady) {
      return (
        <Box full={true}
             colorIndex="light-2">
             { this.renderMyLeagues() }
        </Box>
      );
    } else {
      return (
        <Box justify="center"
             align="center"
             full={true}
             colorIndex="light-2">
          <Headline strong={false}
            size='large'>
            Loading...
          </Headline>
        </Box>
      )
    }
  }
}

export default MyLeagues;
