import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { getUserPacksAndCurrency } from '../actions/User';
import { getAllPlayerKeysAndRegions } from '../actions/Players';
import { openPack } from '../actions/Packs';
import Box from 'grommet/components/Box';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Headline from 'grommet/components/Headline';

class Packs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unopenedPacks: 0,
      allPlayerKeysAndRegions: [],
      currentUid: null
    };
  }

  componentWillMount() {
    getUserPacksAndCurrency((userData) => {
      this.setState({
        currentUid: userData.uid,
        unopenedPacks: userData.unopenedPacks
      });
    });
    getAllPlayerKeysAndRegions((allPlayerKeysAndRegions) => {
      this.setState({
        allPlayerKeysAndRegions: allPlayerKeysAndRegions
      });
    });
  }

  _onClickPack(id, event) {
    event.preventDefault();

    const { allPlayerKeysAndRegions, unopenedPacks } = this.state;

    openPack(allPlayerKeysAndRegions, unopenedPacks, (cardData) => {
      console.log(cardData);
      // Using hack-y temp solution to save cardData into localstorage, so that the pack opening view can retrieve
      localStorage.setItem('cardsInPack', JSON.stringify(cardData));
      browserHistory.push('/openpack/' + id);
    });
  }

  render() {
    const { unopenedPacks } = this.state;
    const listPacks = [];
    for(let i = 0; i < unopenedPacks; i++) {
      listPacks.push(
        (
          <Tile key={i}
                onClick={this._onClickPack.bind(this, i)} >
            <Card thumbnail='https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/packs%2Fleagueoflegends.jpg?alt=media'
              className="card-pack"
              margin="small"
              contentPad="medium"
              direction="column"
              heading='Classic Pack'
              label='League of Legends'
              description='5 Cards' />
          </Tile>
        )
      );
    }
    if (unopenedPacks === 0) {
      return (
        <Box justify="center" align="center" full={true}>
          <Headline strong={false}
            size='medium'>
            You have no unopened packs
          </Headline>
        </Box>
      );
    } else {
      return (
        <Box full={true} colorIndex="light-2">
          <Tiles selectable={false}
            fill={true}
            flush={false} >
            { listPacks }
          </Tiles>
        </Box>
      );
    }
  }
}

export default Packs;
