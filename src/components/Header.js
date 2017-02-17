import React, { Component } from 'react';
import { logout } from '../actions/Auth';
import { getUserPacksAndCurrency } from '../actions/User';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';
import MoneyIcon from 'grommet/components/icons/base/Money';
import SettingsOptionIcon from 'grommet/components/icons/base/SettingsOption';
import MultipleIcon from 'grommet/components/icons/base/Multiple';
import NavAnchor from './NavAnchor';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGold: 0,
      userSilver: 0,
      unopenedPacks: 0
    };
    this._logout = this._logout.bind(this);
  }

  componentWillMount() {
    getUserPacksAndCurrency((userData) => {
      this.setState({
        userGold: userData.gold,
        userSilver: userData.silver,
        unopenedPacks: userData.unopenedPacks
      });
    });
  }

  _logout(e) {
    e.stopPropagation();
    logout();
  }

  render() {
    const { userGold, unopenedPacks } = this.state;
    return (
      <Header justify="center" colorIndex="grey-1">
        <Box
            direction="row"
            responsive={false}
            justify="start"
            align="center"
            pad={{horizontal: 'medium'}}
            flex="grow">
          <GrommetIcon className="brand-logo" size="large" />
          <Box pad="small" />
          <Menu label="Menu" inline={true} direction="row" flex="grow">
            <NavAnchor path="/lobby">Lobby</NavAnchor>
            <NavAnchor path="/myleagues">My Leagues</NavAnchor>
            <NavAnchor path="/collection">Collection</NavAnchor>
            {/* <NavAnchor path="/schedules">Schedules</NavAnchor> */}
            <NavAnchor path="/store">Store</NavAnchor>
            <NavAnchor path="/howtoplay">How To Play</NavAnchor>
          </Menu>

          <Box flex="grow" align="end">
            <Menu label="Profile" inline={true} direction="row" flex="grow">
              <div>
                <Anchor icon={<MultipleIcon />}
                  label={"My Packs (" + unopenedPacks + ")"}
                  animateIcon={true}
                  primary={false}
                  reverse={false}
                  disabled={false}
                  path="/packs" />
              </div>
              <div>
                <Anchor icon={<MoneyIcon className="gold-icon" />}
                  className="gold-icon"
                  label={userGold + " Gold"}
                  animateIcon={true}
                  primary={false}
                  reverse={false}
                  disabled={false} />
              </div>
              <Menu responsive={true}
                icon={<SettingsOptionIcon />}
                size='small'
                closeOnClick={true}>
                <Anchor href='#' className="teamcomp-blue">
                  Profile
                </Anchor>
                <Anchor href='#' className="teamcomp-blue">
                  Change Password
                </Anchor>
                <Anchor className="teamcomp-blue"
                        onClick={(e) => this._logout(e)}>
                  Logout
                </Anchor>
              </Menu>
              {/* <Anchor icon={<CurrencyIcon />}
                label={userSilver + " Silver"}
                animateIcon={true}
                primary={false}
                reverse={false}
                disabled={false} /> */}
            </Menu>
          </Box>
        </Box>
      </Header>
    );
  }
}

export default AppHeader;
