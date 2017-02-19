import React, { Component } from 'react';
import { getUserLeagues } from '../actions/User';
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
    getUserLeagues((myLeagueData) => {
      this.setState({
        myLeagues: myLeagueData,
        isViewReady: true
      });
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
            <Card thumbnail='https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/lcs.jpg?alt=media'
              contentPad={{'vertical': 'medium'}}
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
