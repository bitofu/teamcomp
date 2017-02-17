import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { isUserInLeague, getUserLeagueDraft } from '../actions/User';
import { getLeagueData } from '../actions/Leagues';
import firebase from 'firebase';
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
      userLeagueDraft: null,

      top: null,
      mid: null,
      jungle: null,
      adc: null,
      support: null,
      team: null
    };
    this._draftPlayer = this._draftPlayer.bind(this);
    this._removePlayer = this._removePlayer.bind(this);
    this._lockIn = this._lockIn.bind(this);
  }

  componentWillMount() {
    // Get league key
    const leagueKey = this.props.params.leagueKey;

    isUserInLeague(leagueKey, (userInLeague) => {
      if (userInLeague) {
        getUserLeagueDraft(leagueKey, (userLeagueDraft) => {
          this.setState({
            userLeagueDraft: userLeagueDraft
          });
        });
      }
      this.setState({
        isUserInLeague: userInLeague
      });
    });

    getLeagueData(leagueKey, (leagueData) => {
      this.setState({
        leagueData: leagueData,
        salaryCap: leagueData.salaryCap
      });
    });

    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     // User is signed in.
    //     let currentUid = user.uid;
    //     // Get league key
    //     const leagueKey = this.props.params.leagueKey;
    //
    //     // Set league data
    //     let leaguesRef = firebase.database().ref("leagues/" + leagueKey);
    //     leaguesRef.once("value", (dataSnapshot) => {
    //       let leagueData = dataSnapshot.val();
    //       let leagueRegion = dataSnapshot.val().leagueRegion;
    //
    //       this.setState({
    //         leagueData: leagueData,
    //         salaryCap: leagueData.salaryCap
    //       });
    //
    //       // Get and set user collection data
    //       let collectionRef;
    //       if (leagueRegion.length === 1) {
    //         if (leagueRegion === "All") {
    //           collectionRef = firebase.database().ref("users/" + currentUid + "/collection");
    //         } else {
    //           collectionRef = firebase.database().ref("users/" + currentUid + "/collection").orderByChild("playerRegion").equalTo(leagueRegion);
    //         }
    //         collectionRef.once("value", (dataSnapshot) => {
    //           let collection = [];
    //
    //           dataSnapshot.forEach(function(childSnapshot) {
    //             let collectionData = childSnapshot.val();
    //             collection.push(collectionData);
    //           });
    //
    //           // let filteredAvailableCollection = collection.filter((obj) => {
    //           //   return obj.lockedTo === null;
    //           // });
    //
    //           this.queryCardObjects(collection).then(data => {
    //             this.setState({
    //               collection: data,
    //               isViewReady: true
    //             });
    //           });
    //         });
    //       } else {
    //         collectionRef = firebase.database().ref("users/" + currentUid + "/collection");
    //
    //         collectionRef.once("value", (dataSnapshot) => {
    //           let collection = [];
    //
    //           dataSnapshot.forEach(function(childSnapshot) {
    //             let collectionData = childSnapshot.val();
    //             collection.push(collectionData);
    //           });
    //
    //           let filteredAvailableCollectionByRegions = collection.filter((obj) => {
    //             // return (obj.playerRegion === leagueRegion[0] || obj.playerRegion === leagueRegion[1]) && obj.lockedTo === undefined;
    //             return obj.playerRegion === leagueRegion[0] || obj.playerRegion === leagueRegion[1];
    //           });
    //
    //           this.queryCardObjects(filteredAvailableCollectionByRegions).then(data => {
    //             this.setState({
    //               collection: data,
    //               isViewReady: true
    //             });
    //           });
    //         });
    //       }
    //     });
    //   }
    // });
  }

  queryCardObjects(collectionData) {
    let playerRef = firebase.database().ref("players");

    return Promise.all(
      collectionData.map(obj => {
        let playerKey = obj.playerKey;
        let cardKey = obj.cardKey;
        return playerRef.child(playerKey).once('value')
        .then(snapshot => {
          let cardObj = snapshot.val();
          cardObj.cardKey = cardKey;
          return cardObj;
        })
      })
    ).then(res => {
      return res;
    });
  }

  _draftPlayer(player, event) {
    event.preventDefault();

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

    let currentUser = firebase.auth().currentUser;
    let currentUserId = currentUser.uid;
    let leagueKey = leagueData.leagueKey;

    let updates = {};
    // Save player key in league
    updates['leagues/' + leagueKey + '/users/' + currentUserId] = true;
    // Save league key in player
    updates['users/' + currentUserId + '/leagues/' + leagueKey] = {
      top: top.Name + '-' + top.Tier,
      mid: mid.Name + '-' + mid.Tier,
      jungle: jungle.Name + '-' + jungle.Tier,
      adc: adc.Name + '-' + adc.Tier,
      support: support.Name + '-' + support.Tier
    };
    // Lock cards to league
    // updates['users/' + currentUserId + '/collection/' + top.cardKey + "/lockedTo"] = leagueKey;
    // updates['users/' + currentUserId + '/collection/' + mid.cardKey + "/lockedTo"] = leagueKey;
    // updates['users/' + currentUserId + '/collection/' + jungle.cardKey + "/lockedTo"] = leagueKey;
    // updates['users/' + currentUserId + '/collection/' + adc.cardKey + "/lockedTo"] = leagueKey;
    // updates['users/' + currentUserId + '/collection/' + support.cardKey + "/lockedTo"] = leagueKey;

    firebase.database().ref().update(updates);

    browserHistory.push('/myleagues');
  }

  renderDraftList() {
    const { isUserLockedIn } = this.state;
    if (isUserLockedIn) {
      const { userDraft } = this.state;

      return(
        <List selectable={false}>
          {/* Top */}
          <ListItem justify='between'
                    separator='horizontal'>
            <span>
              { userDraft.top }
            </span>
          </ListItem>
          {/* Mid */}
          <ListItem justify='between'
                    separator='horizontal'>
            <span>
              { userDraft.mid }
            </span>
          </ListItem>
          {/* Jungle */}
          <ListItem justify='between'
                    separator='horizontal'>
            <span>
              { userDraft.jungle }
            </span>
          </ListItem>
          {/* ADC */}
          <ListItem justify='between'
                    separator='horizontal'>
            <span>
              { userDraft.adc }
            </span>
          </ListItem>
          {/* Support */}
          <ListItem justify='between'
                    separator='horizontal'>
            <span>
              { userDraft.support }
            </span>
          </ListItem>
        </List>
      );
    } else {
      const { top, mid, jungle, adc, support, team } = this.state;
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
          {/* Team */}
          {(team === null)
            ? <ListItem justify='between'
                        separator='horizontal'>
                <span>
                  Team
                </span>
                <span className='secondary'>
                  No active Team
                </span>
              </ListItem>
            : <ListItem justify='between'
                        separator='horizontal'>
                <span>
                  Team
                </span>
              </ListItem>
          }
        </List>
      );
    }
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

  render() {
    const { isViewReady, salaryCap, leagueData } = this.state;

    const confirmationPopup = (this.state.confirmationPopup)
      ? <Layer closer={true} flush={false} onClose={ () => { this.setState({ confirmationPopup:false }) } }>
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
                <Button label='Buy'
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
      : null;

    if (isViewReady) {
      const { isUserLockedIn } = this.state;
      return (
        <Box>
          { confirmationPopup }
          {/* League Details */}
          <Box colorIndex="grey-1-a"
               pad='medium'>
            <Box flex={true}
                direction='row'
                responsive={true}>
              <Box size={{width: {min: 'medium'}}}
                   flex={true}>
                <Heading tag='h3'>{ leagueData.title }</Heading>
                <Box direction='row'>
                  <Box align='start'>
                    <span>League Type</span>
                    <span>{ leagueData.leagueType } - { leagueData.gameType }</span>
                  </Box>
                  {/* <Box pad={{horizontal: 'medium'}} align='start'>
                    <span>Players</span>
                    <span>{ leagueData.users.length } / { leagueData.userLimit }</span>
                  </Box> */}
                  <Box pad={{horizontal: 'medium'}} align='start'>
                    <span>Entry Fee</span>
                    <span>{ leagueData.entryFee } Gold</span>
                  </Box>
                  <Box pad={{horizontal: 'medium'}} align='start'>
                    <span>Rewards</span>
                    <span>{ leagueData.totalPot } Gold</span>
                  </Box>
                </Box>
              </Box>
              <Box size={{width: {min: 'medium'}}} align='end' justify='between'>
                <span>{ leagueData.time }</span>
                <span>{ leagueData.requirements }</span>
              </Box>
            </Box>
          </Box>
          {/* Main body */}
          <Box flex={true}
               direction='row'
               responsive={true}>
            {/* Left column */}
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
            {/* Right column */}
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
                  { (isUserLockedIn) ? 'You are currently locked in' : 'Entry Fee: ' + leagueData.entryFee + ' Gold'}
                </Box>
                <Box align='end'>
                  <Button icon={<LockIcon />}
                    label='Lock In'
                    className='button'
                    onClick={ (isUserLockedIn) ? null : this._lockIn }
                    primary={true}
                    secondary={false}
                    accent={false}
                    plain={false} />
                </Box>
              </Box>
            </Box>
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
