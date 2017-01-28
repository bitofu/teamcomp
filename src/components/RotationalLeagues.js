import React, { Component } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Columns from 'grommet/components/Columns';
import Heading from 'grommet/components/Heading';
import SocialTwitterIcon from 'grommet/components/icons/base/SocialTwitter';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import NavAnchor from './NavAnchor';

export default class RotationalLeagues extends Component {
  _onClickCard(path, event) {
    event.preventDefault();
    window.location.href = path;
  }

  render() {
    const twitterIconBox = (
      <Box align="end">
        <SocialTwitterIcon />
      </Box>
    );

    const socialFeedCard1 = (
      <Card
        colorIndex="light-1"
        margin="small"
        contentPad="medium"
        onClick={this._onClickCard.bind(this, 'http://www.twitter.com')}
        direction="column"
        label="Social">
        <Heading tag="h2">
          Protect Your Digital Enterprise ipsum lorem dolores aeat el
        </Heading>
        {twitterIconBox}
      </Card>
    );

    const featuredPostCard = (
      <Card
        colorIndex="light-1"
        margin="small"
        contentPad="medium"
        onClick={this._onClickCard.bind(this, '/league/1234')}
        direction="column"
        label="3x Mids"
        link={
          <NavAnchor path="/league/1234" label="Enter"
            icon={<LinkNextIcon />} />
        }>
        <Heading tag="h2">
          3x the fun with a triple mid draft!
        </Heading>
      </Card>
    );

    return (
      <Box className="columns-container" colorIndex="light-2"
        pad={{horizontal: "large"}} full="horizontal">
        <Columns size="medium" justify="center" masonry={true}
          maxCount={3} responsive={true}>
          {featuredPostCard}
          {featuredPostCard}
        </Columns>
      </Box>
    );
  }
};
