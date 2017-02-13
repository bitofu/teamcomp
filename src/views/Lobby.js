import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import RotationalLeagues from '../components/RotationalLeagues';
import RegularLeagues from '../components/RegularLeagues';

export default class Lobby extends Component {
  render() {
    return (
      <Box>
        <Box align="center">
          <Box pad="large" align="center" textAlign="center"
            size={{"width": {"max": "xxlarge"}}}>
            <Heading tag="h1" strong={true} margin="none">
              Welcome To TeamComp
            </Heading>
          </Box>
        </Box>

        <Box colorIndex="light-2" pad={{vertical: "large"}} align="center">
          <Box align="center"
            size={{"width": "xxlarge"}} pad={{horizontal: "large"}}>
            <Heading tag="h2" strong={true}>
              Weekly Rotational Leagues
            </Heading>
          </Box>
          <RotationalLeagues />
        </Box>

        <Box pad={{vertical: "large"}} align="center">
          <Box align="center"
            size={{"width": "xxlarge"}} pad={{horizontal: "large"}}>
            <Heading tag="h2" strong={true}>
              Regular Leagues
            </Heading>
          </Box>
          <RegularLeagues />
        </Box>
      </Box>
    );
  }
};
