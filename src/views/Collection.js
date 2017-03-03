import React, { Component } from 'react';
import { getUserCollection, filterCollectionByPosition, filterCollectionByRegion } from '../actions/User';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Select from 'grommet/components/Select';
// import CircleInformationIcon from 'grommet/components/icons/base/CircleInformation';
import NowLoading from './NowLoading';

const playerImgPrefix ="https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/players%2F";
const playerImgSuffix =".png?alt=media";
const teamLogoPrefix = "https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/logos%2F"
const teamLogoSuffix = ".png?alt=media";

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
      isViewReady: false,
      filterByPosition: 'All Positions',
      filterByRegion: 'All Regions'
    };
    this._onFilterByPosition = this._onFilterByPosition.bind(this);
    this._onFilterByRegion = this._onFilterByRegion.bind(this);
  }

  componentWillMount() {
    getUserCollection((collectionData) => {
      this.setState({
        collection: collectionData,
        isViewReady: true
      });
    });
  }

  _onFilterByPosition(e) {
    let value = e.value.value;
    this.setState({filterByPosition: value});
  }

  _onFilterByRegion(e) {
    let value = e.value.value;
    this.setState({filterByRegion: value});
  }

  filterCollection(collection) {
    const { filterByPosition, filterByRegion } = this.state;
    let collectionByPosition = filterCollectionByPosition(filterByPosition, collection);
    let collectionByPositionAndRegion = filterCollectionByRegion(filterByRegion, collectionByPosition);
    return collectionByPositionAndRegion;
  }

  renderCards() {
    const { collection } = this.state;

    if (collection.length === 0 || collection === null) {
      return (
        'No cards in collection'
      );
    } else {
      let filteredCollection = this.filterCollection(collection);

      const listCollection = filteredCollection.map((obj) => {
        return (
          <Tile key={obj.cardKey} className="tile-fix">
            <div className="player-tile">
              <div className="player-card">
                <div className="player-name-container">
                  <div className="player-name">{obj.Name} <span className="player-position">{(obj.Position === "Support") ? "Sup" : obj.Position}</span></div>
                  <div className="player-tier">{obj.Tier}</div>
                </div>
                <div className="player-img-container">
                  <img className="player-img" alt="presentation" src={ playerImgPrefix + obj.Name + playerImgSuffix } />
                </div>
                <div className="player-stats-list">
                  <div className="player-stats-info">{obj.TeamNameFull} • {obj.League}</div>
                  <List>
                    <ListItem justify='between'
                      separator='none'
                      className="player-stats">
                      <span>
                        KDA Ratio
                      </span>
                      <span>
                        {obj.KDARatio}
                      </span>
                    </ListItem>
                    <ListItem justify='between'
                      separator='none'
                      className="player-stats">
                      <span>
                        CS Per Min
                      </span>
                      <span>
                        {obj.CSPerMin}
                      </span>
                    </ListItem>
                    <ListItem justify='between'
                      separator='none'
                      className="player-stats">
                      <span>
                        Kill Participation
                      </span>
                      <span>
                        {obj.KillParticipation}
                      </span>
                    </ListItem>
                    <ListItem justify='between'
                      separator='none'
                      className="player-stats">
                      <span>
                        Salary
                      </span>
                      <span>
                        ${obj.Salary}
                      </span>
                    </ListItem>
                  </List>
                  {/* <div className="info-button" onClick={(e) => { this.handleClick(e, obj) }}>
                    <CircleInformationIcon colorIndex="light-1"/>
                  </div> */}
                </div>
              </div>
              <img className="team-logo" alt="presentation" src={ teamLogoPrefix + obj.TeamNameShort + teamLogoSuffix } />
            </div>
          </Tile>
        );
      });

      return (
        <Tiles selectable={false}
           fill={true}
           flush={false}>
          { listCollection }
        </Tiles>
      );
    }
  }

  render() {
    const { isViewReady, filterByPosition, filterByRegion } = this.state;

    if (isViewReady) {
      return (
        <Box colorIndex="light-2" full={true}>
          <Box direction='row'
              justify='center'
              align='center'
              pad='medium'>
            <Box pad={{horizontal: 'small'}}>
              <Select options={[
                {value: 'All Positions', label: 'All Positions'},
                {value: 'Top', label: 'Top'},
                {value: 'Mid', label: 'Mid'},
                {value: 'Jungle', label: 'Jungle'},
                {value: 'ADC', label: 'ADC'},
                {value: 'Support', label: 'Support'}]}
                onChange={this._onFilterByPosition}
                value={filterByPosition}
                placeholder='All'
              />
            </Box>
            <Box pad={{horizontal: 'small'}}>
              <Select options={[
                {value: 'All Regions', label: 'All Regions'},
                {value: 'NA LCS', label: 'NA LCS'},
                {value: 'EU LCS', label: 'EU LCS'},
                {value: 'LCK', label: 'LCK'},
                {value: 'LMS', label: 'LMS'}]}
                onChange={this._onFilterByRegion}
                value={filterByRegion}
                placeholder='All Regions'
              />
            </Box>
          </Box>
          <Box>
            { this.renderCards() }
          </Box>
        </Box>
      );
    } else {
      return (
        <NowLoading />
      );
    }
  }
}

export default Collection;
