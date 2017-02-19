import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { isUserInLeague, getUserLeagueDraft, getUserCollectionByRegionsAndAvailablity, lockInUserToLeague } from '../actions/User';
import { getLeagueData } from '../actions/Leagues';
import LeagueDetails from '../components/LeagueDetails';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import LockIcon from 'grommet/components/icons/base/Lock';
import Headline from 'grommet/components/Headline';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
// import CircleInformationIcon from 'grommet/components/icons/base/CircleInformation';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import FormFields from 'grommet/components/FormFields';
import Paragraph from 'grommet/components/Paragraph';

const playerImgPrefix = "https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/players%2F";
const playerImgSuffix = ".png?alt=media";
const teamLogoPrefix = "https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/logos%2F"
const teamLogoSuffix = ".png?alt=media";

class League extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueData: null,
      collection: [],
      salaryCap: 0,
      isViewReady: false,
      confirmationPopup: false,
      isUserInLeague: false,
      userDraftList: [],

      top: null,
      mid: null,
      jungle: null,
      adc: null,
      support: null
    };
    this._draftPlayer = this._draftPlayer.bind(this);
    this._removePlayer = this._removePlayer.bind(this);
    this._lockIn = this._lockIn.bind(this);
  }

  componentWillMount() {
    // Get league key
    const leagueKey = this.props.params.leagueKey;
    // Set league data
    getLeagueData(leagueKey, (leagueData) => {
      // Check if user is in the league already
      isUserInLeague(leagueKey, (userInLeague) => {
        if (userInLeague) {
          // TODO: Get user's cards from the league and assign to positions.
          getUserLeagueDraft(leagueKey, (draftData) => {
            // Set all states at once
            this.setState({
              leagueData: leagueData,
              salaryCap: leagueData.salaryCap,
              isViewReady: true,
              isUserInLeague: userInLeague,
              userDraftList: draftData
            });
          });
        } else {
          // TODO: Currently allows duplicates in decks, need to lock cards to leagues
          const leagueRegions = leagueData.leagueRegion;
          getUserCollectionByRegionsAndAvailablity(leagueRegions, (collectionData) => {
            // Set all states at once
            this.setState({
              collection: collectionData,
              leagueData: leagueData,
              salaryCap: leagueData.salaryCap,
              isViewReady: true,
              isUserInLeague: userInLeague
            });
          });
        }
      });
    });
  }

  _draftPlayer(player, event) {
    event.preventDefault();
    console.log(player);
    const position = player.Position.toLowerCase();

    if (this.state[position] === null) {
      const { salaryCap } = this.state;
      const salary = player.Salary;
      const newSalaryCap = salaryCap - salary;

      this.setState({
        [position]: player,
        salaryCap: newSalaryCap
      });
    } else {
      alert(position + ' has been filled');
    }
  }

  _removePlayer(player, event) {
    event.preventDefault();

    const position = player.Position.toLowerCase();

    const { salaryCap } = this.state;
    const salary = player.Salary;
    const newSalaryCap = salaryCap + Number(salary);

    this.setState({
      [position]: null,
      salaryCap: newSalaryCap
    });
  }

  _lockIn() {
    const { top, mid, jungle, adc, support, salaryCap } = this.state;

    if (top === null || mid === null || jungle === null || adc === null || support === null) {
      alert('Please finish drafting a full team');
    } else {
      if (salaryCap >= 0) {
        this.setState({
          confirmationPopup: true
        });
      } else {
        alert('You have surpassed the salary limit');
      }
    }
  }

  closePopup(e) {
    e.stopPropagation();
    this.setState({ confirmationPopup:false });
  }

  confirmLockIn(e) {
    e.preventDefault();

    const { top, mid, jungle, adc, support, leagueData } = this.state;
    const leagueKey = leagueData.leagueKey;
    const entryFee = leagueData.entryFee;

    lockInUserToLeague(top, mid, jungle, adc, support, leagueKey, entryFee, (res) => {
      browserHistory.push('/myleagues');
    });
  }

  filterCollection(position, collection) {
    let filteredCollection = collection.filter((obj) => {
      return obj.Position === position;
    });
    return filteredCollection;
  }

  // TODO: REFACTOR THIS PIECE OF SHIT
  renderCards(position) {
    const { isUserInLeague } = this.state;
    if (isUserInLeague) {
      const { userDraftList } = this.state;
      let listCollection = userDraftList.map(obj => {
        const position = obj.Position.toLowerCase();

        return (
          <Tile key={obj.cardKey}
                className={ (this.state[position] === null) ? "tile-fix" : "tile-fix tile-grey-out" }
                onClick={this._draftPlayer.bind(this, obj)}>
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
    } else {
      const { collection } = this.state;

      if (collection.length === 0 || collection === null) {
        return (
          'No cards in collection'
        );
      } else {
        let filterCollection = (position === 'All') ? collection : this.filterCollection(position, collection);

        const listCollection = filterCollection.map((obj) => {
          const position = obj.Position.toLowerCase();

          return (
            <Tile key={obj.cardKey}
                  className={ (this.state[position] === null) ? "tile-fix" : "tile-fix tile-grey-out" }
                  onClick={this._draftPlayer.bind(this, obj)}>
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
  }

  renderCollection() {
    return (
      <Box size={{width: {min: 'medium'}}}
           flex={true}
           pad='medium'>
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
  }

  // TODO: REFACTOR THIS PIECE OF SHIT
  renderDraftList() {
    const { isUserInLeague } = this.state;
    if (isUserInLeague) {
      const { userDraftList } = this.state;
      let renderListItems = userDraftList.map(obj => {
        return (
          <ListItem key={obj.cardKey}
                    justify='between'
                    separator='horizontal'>
            <div>
              { obj.Position } • { obj.Name } • ${ obj.Salary }
            </div>
          </ListItem>
        );
      });

      return (
        <List selectable={false}>
          { renderListItems }
        </List>
      );
    } else {
      const { top, mid, jungle, adc, support } = this.state;
      return (
        <List selectable={false}>
          {/* Top */}
          {(top === null)
            ? <ListItem justify='between'
                        separator='horizontal'>
                <span>
                  Top
                </span>
                <span className='secondary'>
                  No active player
                </span>
              </ListItem>
            : <ListItem justify='between'
                        separator='horizontal'>
                <div>
                  Top • { top.Name } • ${ top.Salary }
                </div>
                <Anchor className='secondary'
                        onClick={this._removePlayer.bind(this, top)}>
                  Remove
                </Anchor>
              </ListItem>
          }
          {/* Mid */}
          {(mid === null)
            ? <ListItem justify='between'
                        separator='horizontal'>
                <span>
                  Mid
                </span>
                <span className='secondary'>
                  No active player
                </span>
              </ListItem>
            : <ListItem justify='between'
                        separator='horizontal'>
                <span>
                  Mid • { mid.Name } • ${ mid.Salary }
                </span>
                <Anchor className='secondary'
                        onClick={this._removePlayer.bind(this, mid)}>
                  Remove
                </Anchor>
              </ListItem>
          }
          {/* Jungle */}
          {(jungle === null)
            ? <ListItem justify='between'
                        separator='horizontal'>
                <span>
                  Jungle
                </span>
                <span className='secondary'>
                  No active player
                </span>
              </ListItem>
            : <ListItem justify='between'
                        separator='horizontal'>
                <span>
                  Jungle • { jungle.Name } • ${ jungle.Salary }
                </span>
                <Anchor className='secondary'
                        onClick={this._removePlayer.bind(this, jungle)}>
                  Remove
                </Anchor>
              </ListItem>
          }
          {/* ADC */}
          {(adc === null)
            ? <ListItem justify='between'
                        separator='horizontal'>
                <span>
                  ADC
                </span>
                <span className='secondary'>
                  No active player
                </span>
              </ListItem>
            : <ListItem justify='between'
                        separator='horizontal'>
                <span>
                  ADC • { adc.Name } • ${ adc.Salary }
                </span>
                <Anchor className='secondary'
                        onClick={this._removePlayer.bind(this, adc)}>
                  Remove
                </Anchor>
              </ListItem>
          }
          {/* Support */}
          {(support === null)
            ? <ListItem justify='between'
                        separator='horizontal'>
                <span>
                  Support
                </span>
                <span className='secondary'>
                  No active player
                </span>
              </ListItem>
            : <ListItem justify='between'
                        separator='horizontal'>
                <span>
                  Support • { support.Name } • ${support.Salary}
                </span>
                <Anchor className='secondary'
                        onClick={this._removePlayer.bind(this, support)}>
                  Remove
                </Anchor>
              </ListItem>
          }
        </List>
      );
    }
  }

  renderDraftActions() {
    const { salaryCap, leagueData, isUserInLeague } = this.state;
    return (
      <Box size={{width: {min: 'large'}}}
           separator='left'>
        <Box direction='row'
           responsive={true}
           pad='medium'>
          <Box flex={true}>
           <Title>Your Lineup</Title>
          </Box>
          <Box align='end'>
           <Title>{ '$' + salaryCap + ' remaining' }</Title>
          </Box>
        </Box>
        { this.renderDraftList() }
        <Box direction='row'
           responsive={true}
           pad='medium'>
          <Box flex={true} justify="center">
            { (isUserInLeague) ? 'You are currently locked in' : 'Entry Fee: ' + leagueData.entryFee + ' Gold'}
          </Box>
          <Box align='end'>
            <Button icon={<LockIcon />}
              label='Lock In'
              className='button'
              onClick={ (isUserInLeague) ? null : this._lockIn }
              primary={true}
              secondary={false}
              accent={false}
              plain={false} />
          </Box>
        </Box>
      </Box>
    );
  }

  renderConfirmationPopup() {
    const { confirmationPopup } = this.state;
    if (confirmationPopup) {
      return (
        <Layer closer={true} flush={false} onClose={ () => { this.setState({ confirmationPopup:false }) } }>
          <Form pad='large'>
            <Header>
              <Heading tag="h2">
                Draft Confirmation
              </Heading>
            </Header>
            <FormFields>
              <fieldset>
                <Paragraph>You must acknowledge the following:</Paragraph>
                <Paragraph>Your funds will be deducted by the entry fee</Paragraph>
                <Paragraph>Your cards will be locked into the league</Paragraph>
              </fieldset>
            </FormFields>
            <Footer pad={{"vertical": "medium"}}>
              <Box>
                <Button label='Lock In'
                  type='submit'
                  primary={true}
                  onClick={(e) => { this.confirmLockIn(e) }} />
              </Box>
              <Box pad={{"horizontal": "medium"}}>
                <Button label='Cancel'
                  type='reset'
                  primary={false}
                  onClick={(e) => { this.closePopup(e) }} />
              </Box>
            </Footer>
          </Form>
        </Layer>
      );
    } else {
      return null;
    }
  }

  render() {
    const { isViewReady, leagueData } = this.state;
    if (isViewReady) {
      return (
        <Box>
          { this.renderConfirmationPopup() }
          {/* League Details */}
          <LeagueDetails leagueData={leagueData} />
          {/* Main body */}
          <Box flex={true}
               direction='row'
               responsive={true}>
            {/* Left column */}
            { this.renderCollection() }
            {/* Right column */}
            { this.renderDraftActions() }
          </Box>
        </Box>
      );
    } else {
      return (
        <Box justify="center" align="center" full={true}>
          <Headline strong={false}
            size='large'>
            Loading...
          </Headline>
        </Box>
      );
    }
  }
}

export default League;
