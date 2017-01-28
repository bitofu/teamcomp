import React, { Component } from 'react';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';

class Collection extends Component {
  render() {
    return (
      <Box colorIndex="light-2">
        <Tiles selectable={true}
          fill={false}
          flush={false}>
          <Tile colorIndex="light-1">
            <Card thumbnail='/img/carousel-1.png'
              heading='Sample Heading'
              label='Sample Label'
              description='Sample description providing more details.' />
          </Tile>
          <Tile colorIndex="light-1">
            <Card thumbnail='/img/carousel-1.png'
              heading='Sample Heading'
              label='Sample Label'
              description='Sample description providing more details.' />
          </Tile>
          <Tile colorIndex="light-1">
            <Card thumbnail='/img/carousel-1.png'
              heading='Sample Heading'
              label='Sample Label'
              description='Sample description providing more details.' />
          </Tile>
          <Tile colorIndex="light-1">
            <Card thumbnail='/img/carousel-1.png'
              heading='Sample Heading'
              label='Sample Label'
              description='Sample description providing more details.' />
          </Tile>
          <Tile colorIndex="light-1">
            <Card thumbnail='/img/carousel-1.png'
              heading='Sample Heading'
              label='Sample Label'
              description='Sample description providing more details.' />
          </Tile>
          <Tile colorIndex="light-1">
            <Card thumbnail='/img/carousel-1.png'
              heading='Sample Heading'
              label='Sample Label'
              description='Sample description providing more details.' />
          </Tile>
          <Tile colorIndex="light-1">
            <Card thumbnail='/img/carousel-1.png'
              heading='Sample Heading'
              label='Sample Label'
              description='Sample description providing more details.' />
          </Tile>
          <Tile colorIndex="light-1">
            <Card thumbnail='/img/carousel-1.png'
              heading='Sample Heading'
              label='Sample Label'
              description='Sample description providing more details.' />
          </Tile>
          <Tile colorIndex="light-1">
            <Card thumbnail='/img/carousel-1.png'
              heading='Sample Heading'
              label='Sample Label'
              description='Sample description providing more details.' />
          </Tile>
          <Tile colorIndex="light-1">
            <Card thumbnail='/img/carousel-1.png'
              heading='Sample Heading'
              label='Sample Label'
              description='Sample description providing more details.' />
          </Tile>
        </Tiles>
      </Box>
    );
  }
}

export default Collection;
