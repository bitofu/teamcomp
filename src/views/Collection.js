import React, { Component } from 'react';
import { getUserCollection } from '../actions/User';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Headline from 'grommet/components/Headline';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
// import CircleInformationIcon from 'grommet/components/icons/base/CircleInformation';

const playerImgPrefix ="https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/players%2F";
const playerImgSuffix =".png?alt=media";
const teamLogoPrefix = "https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/logos%2F"
const teamLogoSuffix = ".png?alt=media";

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
      isViewReady: false
    };
  }

  componentWillMount() {
    getUserCollection((collectionData) => {
      this.setState({
        collection: collectionData,
        isViewReady: true
      });
    });
  }

  filterCollection(position, collection) {
    let filteredCollection = collection.filter((obj) => {
      return obj.Position === position;
    });
    return filteredCollection;
  }

  renderCards(position) {
    const { collection } = this.state;

    if (collection.length === 0 || collection === null) {
      return (
        'No cards in collection'
      );
    } else {
      let filterCollection = (position === 'All') ? collection : this.filterCollection(position, collection);

      const listCollection = filterCollection.map((obj) => {
        return (
          <Tile key={obj.cardKey} className="tile-fix">
            <div className="player-tile">
              <div className="player-card">
                <div className="player-name-container">
                  <div className="player-name">{obj.Name} <span className="player-position">{obj.Position}</span></div>
                  <div className="player-tier">{obj.Tier}</div>
                </div>
                <div className="player-img-container">
                  <img className="player-img" alt="presentation" src={ (obj.League === 'LMS' || obj.League === 'LCK') ? playerImgPrefix + "unknown" + playerImgSuffix : playerImgPrefix + obj.Name + playerImgSuffix } />
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
              <img className="team-logo" alt="presentation" src={ (obj.League === 'LMS' || obj.League === 'LCK') ? null : teamLogoPrefix + obj.TeamNameShort + teamLogoSuffix } />
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
    const { isViewReady } = this.state;

    if (isViewReady) {
      return (
        <Box colorIndex="light-2" full={true}>
          <Tabs>
            <Tab title='All'>
              { this.renderCards('All') }
            </Tab>
            <Tab title='Top'>
              { this.renderCards('Top') }
            </Tab>
            <Tab title='Mid'>
              { this.renderCards('Mid') }
            </Tab>
            <Tab title='Jungle'>
              { this.renderCards('Jungle') }
            </Tab>
            <Tab title='ADC'>
              { this.renderCards('ADC') }
            </Tab>
            <Tab title='Support'>
              { this.renderCards('Support') }
            </Tab>
          </Tabs>
        </Box>
      );
    } else {
      return (
        <Box justify="center"
             align="center"
             full={true}
             colorIndex="light-2">
          <Headline strong={false}
            size='large'>
            Loading...
          </Headline>
        </Box>
      );
    }
  }
}

export default Collection;
