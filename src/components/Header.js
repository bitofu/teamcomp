import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router'
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';
import MoneyIcon from 'grommet/components/icons/base/Money';
import CurrencyIcon from 'grommet/components/icons/base/Currency';
import MultipleIcon from 'grommet/components/icons/base/Multiple';
import Edit from 'grommet/components/icons/base/Edit';
import SearchIcon from 'grommet/components/icons/base/Search';
import NavAnchor from './NavAnchor';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGold: 0,
      userSilver: 0,
      unopenedPacks: 0
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        let currentUid = user.uid;

        let userDataRef = firebase.database().ref("users/" + currentUid);
        userDataRef.on("value", function(dataSnapshot) {
          let userData = dataSnapshot.val();
          this.setState({
            userGold: userData.gold,
            userSilver: userData.silver,
            unopenedPacks: userData.unopenedPacks
          });
        }.bind(this));
      }
    });
  }

  render() {
    const { userGold, userSilver, unopenedPacks } = this.state;
    return (
      <Header justify="center" colorIndex="neutral-4">
        {/* <Box size={{width: {max: 'xxlarge'}}} */}
        <Box
            direction="row"
            responsive={false}
            justify="start"
            align="center"
            pad={{horizontal: 'medium'}}
            flex="grow">
          <GrommetIcon colorIndex="brand" size="large" />
          <Box pad="small" />
          <Menu label="Label" inline={true} direction="row" flex="grow">
            <NavAnchor path="/lobby">Lobby</NavAnchor>
            <NavAnchor path="/collection">Collection</NavAnchor>
            <NavAnchor path="/schedules">Schedules</NavAnchor>
            <NavAnchor path="/store">Store</NavAnchor>
          </Menu>

          <Box flex="grow" align="end">
            <Menu label="Label" inline={true} direction="row" flex="grow">
              <Anchor icon={<MultipleIcon />}
                label={unopenedPacks}
                animateIcon={true}
                primary={false}
                reverse={false}
                disabled={false}
                path="/packs" />
              <Anchor icon={<MoneyIcon />}
                label={userGold}
                animateIcon={true}
                primary={false}
                reverse={false}
                disabled={false} />
              <Anchor icon={<CurrencyIcon />}
                label={userSilver}
                animateIcon={true}
                primary={false}
                reverse={false}
                disabled={false} />
            </Menu>
          </Box>
        </Box>
      </Header>
    );
  }
}

export default AppHeader;
