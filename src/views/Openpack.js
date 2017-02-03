import React, { Component } from 'react';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';

class Openpack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsInPack: []
    };
  }

  componentWillMount() {
    const cardsInPack = JSON.parse(localStorage.getItem('cardsInPack'));
    this.setState({
      cardsInPack: cardsInPack
    });
  }

  render() {
    const { cardsInPack } = this.state;
    const listCards = cardsInPack.map((obj) =>
      <Tile key={obj.name} colorIndex="light-1">
        <Card thumbnail='/img/carousel-1.png'
          heading={ obj.name }
          label={ obj.email }
          description={ obj.gender } />
      </Tile>
    );

    return (
      <Box colorIndex="light-2">
        <Tiles selectable={true}
          fill={false}
          flush={false}>
          { listCards }
        </Tiles>
      </Box>
    );
  }
}

export default Openpack;
