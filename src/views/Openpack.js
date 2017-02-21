import React, { Component } from 'react';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
// import CircleInformationIcon from 'grommet/components/icons/base/CircleInformation';

const playerImgPrefix = "https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/players%2F";
const playerImgSuffix = ".png?alt=media";
const teamLogoPrefix = "https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/logos%2F"
const teamLogoSuffix = ".png?alt=media";

class Openpack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsInPack: [],
      flipped0: false,
      flipped1: false,
      flipped2: false,
      flipped3: false,
      flipped4: false
    };
    this._onFlip = this._onFlip.bind(this);
  }

  componentWillMount() {
    const cardsInPack = JSON.parse(localStorage.getItem('cardsInPack'));
    this.setState({
      cardsInPack: cardsInPack
    });
  }

  _onFlip(flippedIndex, e) {
    e.preventDefault();

    this.setState({
      [flippedIndex]: true
    });
  }

  render() {
    const { cardsInPack } = this.state;
    console.log(cardsInPack);

    const listCards = cardsInPack.map((obj) => {
      const cardIndex = cardsInPack.indexOf(obj);
      const flippedIndex = "flipped" + cardIndex;

      return (
        <Tile key={obj.Name + "-" + obj.Tier}
              className="tile-fix"
              onClick={this._onFlip.bind(this, flippedIndex)}>
          <div className="card-container">
            <div className={"card-front " + (this.state[flippedIndex] ? "front-flip" : "")}>
              <div className="player-tile">
                <div className="player-card">
                  <div className="player-name-container">
                    <div className="player-name">{obj.Name} <span className="player-position">{obj.Position}</span></div>
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
            </div>
            <div className={"card-back " + (this.state[flippedIndex] ? "back-flip" : "")}>
              <div className="player-tile">
                <div className="player-card">
                  Card Back
                </div>
              </div>
            </div>
          </div>
        </Tile>
      );
    }
    );

    return (
      <Box justify="center" full={true}>
        <Tiles selectable={false}
          fill={true}
          flush={false}>
          { listCards }
        </Tiles>
      </Box>
    );
  }
}

export default Openpack;
