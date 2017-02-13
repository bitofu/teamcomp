import React, { Component } from 'react';
import firebase from 'firebase';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import NavAnchor from './NavAnchor';

export default class RotationalLeagues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
    };
  }

  componentWillMount() {
    let leaguesRef = firebase.database().ref("leagues").orderByChild("leagueType").equalTo("rotation");
    leaguesRef.once("value", function(dataSnapshot) {
      let leagues = [];
      dataSnapshot.forEach(function(childSnapshot) {
        let leagueData = childSnapshot.val();
        leagues.push(leagueData);
      });
      this.setState({
        leagues: leagues
      });
    }.bind(this));
  }

  render() {
    const { leagues } = this.state;
    const listLeagues = leagues.map((league) =>
      <Tile key={league.leagueKey} >
        <Card margin="small"
          contentPad="large"
          direction="column"
          label={ (league.leagueRegion.length === 1) ? league.leagueRegion : league.leagueRegion[0] + " and " + league.leagueRegion[1] }
          link={
            <NavAnchor path={"/league/" + league.leagueKey } label="Enter"
              icon={<LinkNextIcon />} />
          }>
          <Heading tag="h2">
            { league.title }
          </Heading>
        </Card>
      </Tile>
    );

    return (
      <Box>
        <Tiles selectable={false}
          fill={true}
          flush={false} >
          { listLeagues }
        </Tiles>
      </Box>
    );
  }
};
