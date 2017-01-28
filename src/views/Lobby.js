import React, { Component } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero';
import Paragraph from 'grommet/components/Paragraph';
import Header from '../components/Header';
import RotationalLeagues from '../components/RotationalLeagues';
import RegularLeagues from '../components/RegularLeagues';
import Menu from 'grommet/components/Menu';

export default class Lobby extends Component {
  render() {
    return (
      <Box>
        <Box align="center">
          <Box pad="large" align="center" textAlign="center"
            size={{"width": {"max": "xxlarge"}}}>
            <Heading tag="h1" strong={true} margin="none">
              Sumo accumsan mel ignota hendrerit.
            </Heading>
            <Paragraph size="xlarge" width="large">
              Lorem ipsum dolor sit amet, dicat sonet congue ei mei, est summo
              copiosae facilisi an. Sumo accumsan mel ea, eu ignota hendrerit
              consequuntur me.
            </Paragraph>
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

        <Footer full="horizontal">
          <Box colorIndex="neutral-1" pad="small" align="center" full="horizontal">
            <Box className="footer-cards-container" pad={{vertical: "medium"}}
              size={{width: 'xxlarge'}} direction="row" flex="grow">
              <Card
                pad={{horizontal: "large"}}
                contentPad="medium"
                heading="Lorem ipsum dolor sit amet"
                label="Label"
                basis="1/2"
                link={
                  <Anchor href="http://www.grommet.io/docs/" primary={true}>
                    Learn More
                  </Anchor>
                }
                separator="right" />
              <Card
                pad={{horizontal: "large"}}
                contentPad="medium"
                heading="Lorem ipsum dolor sit amet"
                label="Label"
                basis="1/2"
                link={
                  <Anchor href="http://www.grommet.io/docs/" primary={true}>
                    Learn More
                  </Anchor>
                } />
            </Box>
          </Box>
        </Footer>
      </Box>
    );
  }
};
