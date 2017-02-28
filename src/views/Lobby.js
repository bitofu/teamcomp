import React, { Component } from 'react';
import { observer } from 'mobx-react';
import userStore from '../stores/User';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
// import Hero from 'grommet/components/Hero';
import RotationalLeagues from '../components/RotationalLeagues';
import RegularLeagues from '../components/RegularLeagues';

@observer
export default class Lobby extends Component {
  render() {
    console.log(userStore.isAuth);
    return (
      <Box colorIndex="light-2" full={true}>
        <Box align="center">
          <Box pad="large" align="center" textAlign="center"
            size={{"width": {"max": "xxlarge"}}}>
            <Heading tag="h1" strong={true} margin="none">
              TeamComp. Fantasy eSports meeting Ultimate Team.
            </Heading>
          </Box>
        </Box>

        {/* <Box colorIndex="light-2" pad={{vertical: "large"}} align="center">
          <Box align="center"
            size={{"width": "xxlarge"}} pad={{horizontal: "large"}}>
            <Heading tag="h2" strong={true}>
              Weekly Rotational Leagues
            </Heading>
          </Box>
          <RotationalLeagues />
        </Box> */}

        <Box pad={{vertical: "large"}} align="center">
          <Box align="center" size={{"width": "xxlarge"}} pad={{horizontal: "large"}}>
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
