import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';

class Landing extends Component {
  render() {
    return (
      <Box justify="center"
           align="center"
           full={true}
           colorIndex="light-2">
        <Headline strong={false}
          size='large'>
          Coming Soon!
        </Headline>
      </Box>
    );
  }
}

export default Landing;
