import React, { Component } from 'react';
import { getLeagues } from '../actions/Leagues';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import NavAnchor from './NavAnchor';

export default class RegularLeagues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
    };
  }

  componentWillMount() {
    getLeagues('regular', (leagues) => {
      this.setState({
        leagues: leagues
      });
    });
  }

  render() {
    const { leagues } = this.state;
    const listLeagues = leagues.map((league) =>
      <Tile key={league.leagueKey} >
        <Card
          margin="small"
          contentPad="large"
          direction="column"
          label={ "Type: " + league.gameType }
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
