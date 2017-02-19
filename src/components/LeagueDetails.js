import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

class LeagueDetails extends Component {
  render() {
    const { leagueData } = this.props;
    return (
      <Box colorIndex="grey-1-a"
           pad='medium'>
        <Box flex={true}
            direction='row'
            responsive={true}>
          <Box size={{width: {min: 'medium'}}}
               flex={true}>
            <Heading tag='h3'>{ leagueData.title }</Heading>
            <Box direction='row'>
              <Box align='start'>
                <span>League Type</span>
                <span>{ leagueData.leagueType } - { leagueData.gameType }</span>
              </Box>
              {/* <Box pad={{horizontal: 'medium'}} align='start'>
                <span>Players</span>
                <span>{ leagueData.users.length } / { leagueData.userLimit }</span>
              </Box> */}
              <Box pad={{horizontal: 'medium'}} align='start'>
                <span>Entry Fee</span>
                <span>{ leagueData.entryFee } Gold</span>
              </Box>
              <Box pad={{horizontal: 'medium'}} align='start'>
                <span>Rewards</span>
                <span>{ leagueData.totalPot } Gold</span>
              </Box>
            </Box>
          </Box>
          <Box size={{width: {min: 'medium'}}} align='end' justify='between'>
            <span>{ leagueData.time }</span>
            <span>{ leagueData.requirements }</span>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default LeagueDetails;
