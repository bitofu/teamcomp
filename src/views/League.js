import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Columns from 'grommet/components/Columns';

class League extends Component {
  render() {
    return (
      <Columns size='large'
        justify='center'
        maxCount={4}
        masonry={false}>
        <Box align='center'
          pad='small'
          margin='small'
          size={{"width": {"min": "xxlarge"}}}
          colorIndex='light-2'>

          <Tiles selectable={true}
            fill={false}
            flush={false}>
            <Tile>
              <Card thumbnail='/img/carousel-1.png'
                heading='Sample Heading'
                label='Sample Label'
                size='small'
                description='Sample description providing more details.' />
            </Tile>
            <Tile>
              <Card thumbnail='/img/carousel-1.png'
                heading='Sample Heading'
                label='Sample Label'
                size='small'
                description='Sample description providing more details.' />
            </Tile>
            <Tile>
              <Card thumbnail='/img/carousel-1.png'
                heading='Sample Heading'
                label='Sample Label'
                size='small'
                description='Sample description providing more details.' />
            </Tile>
            <Tile>
              <Card thumbnail='/img/carousel-1.png'
                heading='Sample Heading'
                label='Sample Label'
                size='small'
                description='Sample description providing more details.' />
            </Tile>
          </Tiles>

        </Box>
        <Box align='center'
          pad='small'
          margin='small'
          size={{"width": {"min": "large"}}}
          colorIndex='light-2'>
          Box 2
        </Box>
      </Columns>
      // <Box>
      //   <Box colorIndex='neutral-1'>
      //     <Tiles selectable={true}
      //       fill={false}
      //       flush={false}>
      //       <Tile>
      //         <Card thumbnail='/img/carousel-1.png'
      //           heading='Sample Heading'
      //           label='Sample Label'
      //           description='Sample description providing more details.' />
      //       </Tile>
      //       <Tile>
      //         <Card thumbnail='/img/carousel-1.png'
      //           heading='Sample Heading'
      //           label='Sample Label'
      //           description='Sample description providing more details.' />
      //       </Tile>
      //       <Tile>
      //         <Card thumbnail='/img/carousel-1.png'
      //           heading='Sample Heading'
      //           label='Sample Label'
      //           description='Sample description providing more details.' />
      //       </Tile>
      //       <Tile>
      //         <Card thumbnail='/img/carousel-1.png'
      //           heading='Sample Heading'
      //           label='Sample Label'
      //           description='Sample description providing more details.' />
      //       </Tile>
      //       <Tile>
      //         <Card thumbnail='/img/carousel-1.png'
      //           heading='Sample Heading'
      //           label='Sample Label'
      //           description='Sample description providing more details.' />
      //       </Tile>
      //       <Tile>
      //         <Card thumbnail='/img/carousel-1.png'
      //           heading='Sample Heading'
      //           label='Sample Label'
      //           description='Sample description providing more details.' />
      //       </Tile>
      //       <Tile>
      //         <Card thumbnail='/img/carousel-1.png'
      //           heading='Sample Heading'
      //           label='Sample Label'
      //           description='Sample description providing more details.' />
      //       </Tile>
      //       <Tile>
      //         <Card thumbnail='/img/carousel-1.png'
      //           heading='Sample Heading'
      //           label='Sample Label'
      //           description='Sample description providing more details.' />
      //       </Tile>
      //       <Tile>
      //         <Card thumbnail='/img/carousel-1.png'
      //           heading='Sample Heading'
      //           label='Sample Label'
      //           description='Sample description providing more details.' />
      //       </Tile>
      //       <Tile>
      //         <Card thumbnail='/img/carousel-1.png'
      //           heading='Sample Heading'
      //           label='Sample Label'
      //           description='Sample description providing more details.' />
      //       </Tile>
      //     </Tiles>
      //
      //   </Box>
      //   <Box colorIndex='neutral-2'>
      //
      //     <List selectable={true}>
      //       <ListItem justify='between'
      //         separator='horizontal'>
      //         <span>
      //           Alan
      //         </span>
      //         <span className='secondary'>
      //           happy
      //         </span>
      //       </ListItem>
      //       <ListItem justify='between'>
      //         <span>
      //           Chris
      //         </span>
      //         <span className='secondary'>
      //           cool
      //         </span>
      //       </ListItem>
      //       <ListItem justify='between'>
      //         <span>
      //           Eric
      //         </span>
      //         <span className='secondary'>
      //           odd
      //         </span>
      //       </ListItem>
      //     </List>
      //
      //   </Box>
      // </Box>
    );
  }
}

export default League;
