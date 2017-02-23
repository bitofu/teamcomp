import React, { Component } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero';
import Paragraph from 'grommet/components/Paragraph';
import Card from 'grommet/components/Card';
import Video from 'grommet/components/Video';
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';

class Landing extends Component {
  render() {
    return (
      <Box>
        <Box>
          <Hero background={
            <Video autoPlay={true}
              showControls={false}
              loop={true}
              muted={true}
              fit='cover'>
              <source src='https://overwatchleague.com/vid/owl-announce.webm'
                type='video/webm' />
            </Video>}
            backgroundColorIndex='dark'
            size='medium'>
            <Box justify='center'
                align='center'>
              <Box pad="large">
                <GrommetIcon className="brand-logo-landing" />
              </Box>
              <Box pad="large">
                <Heading strong={true} tag='h1' align='center'>
                  Assemble Your TeamComp.
                  <br/>
                  Dominate Your League.
                </Heading>
              </Box>
            </Box>
          </Hero>
          {/* <Hero size="large" backgroundImage="/img/marquee.jpg" colorIndex="light-1">
            <Card
              heading={
                <Heading strong={true}>
                  Accelerate your transformation with the cloud
                </Heading>
              }
              description="HPE can help you benefit now from your right mix of cloud"
              label="label"
              size="large"
              link={
                <Anchor href="#" primary={true} label="Learn More" />
              } />
          </Hero> */}
        </Box>

        <Box align="center" pad="large" colorIndex="light-2" direction="row" flex="grow">
          <Box pad="large" basis='1/2'>
            <Heading tag="h1" strong={true}>
              Sumo accumsan mel ignota hendrerit.
            </Heading>
            <Paragraph className="paragraph-fix" size="large">
              Lorem ipsum dolor sit amet, dicat sonet congue ei mei, est summo
              copiosae facilisi an. Sumo accumsan mel ea, eu ignota hendrerit
              consequuntur me.
            </Paragraph>
          </Box>
          <Box pad="large" basis='1/2'>
            <Heading tag="h1" strong={true}>
              Sumo accumsan mel ignota hendrerit.
            </Heading>
            <Paragraph className="paragraph-fix" size="large">
              Lorem ipsum dolor sit amet, dicat sonet congue ei mei, est summo
              copiosae facilisi an. Sumo accumsan mel ea, eu ignota hendrerit
              consequuntur me.
            </Paragraph>
          </Box>
        </Box>

        <Box align="center" pad="large" texture="https://overwatchleague.com/img/bg-path.jpg" colorIndex="dark">
          <Box pad="large">
            <Heading tag="h1" strong={true}>
              Sumo accumsan mel ignota hendrerit.
            </Heading>
            <Paragraph className="paragraph-fix" size="large">
              Lorem ipsum dolor sit amet, dicat sonet congue ei mei, est summo
              copiosae facilisi an. Sumo accumsan mel ea, eu ignota hendrerit
              consequuntur me.
            </Paragraph>
          </Box>
        </Box>

        <Box align="center" pad="large" colorIndex="light-2" direction="row" flex="grow">
          <Box pad="large" basis='1/2'>
            <Heading tag="h1" strong={true}>
              Sumo accumsan mel ignota hendrerit.
            </Heading>
            <Paragraph className="paragraph-fix" size="large">
              Lorem ipsum dolor sit amet, dicat sonet congue ei mei, est summo
              copiosae facilisi an. Sumo accumsan mel ea, eu ignota hendrerit
              consequuntur me.
            </Paragraph>
          </Box>
          <Box pad="large" basis='1/2'>
            <Heading tag="h1" strong={true}>
              Sumo accumsan mel ignota hendrerit.
            </Heading>
            <Paragraph className="paragraph-fix" size="large">
              Lorem ipsum dolor sit amet, dicat sonet congue ei mei, est summo
              copiosae facilisi an. Sumo accumsan mel ea, eu ignota hendrerit
              consequuntur me.
            </Paragraph>
          </Box>
        </Box>


        <Footer full="horizontal">
          <Box colorIndex="neutral-1" pad="large" align="center" full="horizontal">
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

      // <Box justify="center"
      //      align="center"
      //      full={true}
      //      colorIndex="light-2">
      //   <Headline strong={false}
      //     size='large'>
      //     Coming Soon!
      //   </Headline>
      // </Box>
    );
  }
}

export default Landing;
