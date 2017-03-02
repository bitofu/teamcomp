import React, { Component } from 'react';
import { logout } from '../actions/Auth';
import { observer } from 'mobx-react';
import userStore from '../stores/User';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';
import MoneyIcon from 'grommet/components/icons/base/Money';
import SettingsOptionIcon from 'grommet/components/icons/base/SettingsOption';
import MultipleIcon from 'grommet/components/icons/base/Multiple';
import NavAnchor from './NavAnchor';

@observer
class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: false,
      userGold: 0,
      userSilver: 0,
      unopenedPacks: 0
    };
    this._logout = this._logout.bind(this);
  }

  _logout(e) {
    e.stopPropagation();
    logout();
  }

  render() {
    if (userStore.isAuth) {
      return (
        <Header justify="center" colorIndex="grey-1">
          <Box direction="row"
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
                    label={"My Packs (" + userStore.unopenedPacks + ")"}
                    animateIcon={true}
                    primary={false}
                    reverse={false}
                    disabled={false}
                    path="/packs" />
                </div>
                <div>
                  <Anchor icon={<MoneyIcon className="gold-icon" />}
                    className="gold-icon"
                    label={userStore.gold + " Gold"}
                    animateIcon={true}
                    primary={false}
                    reverse={false}
                    disabled={false} />
                </div>
                <Menu responsive={true}
                  icon={<SettingsOptionIcon />}
                  size='small'
                  closeOnClick={true}>
                  {/* <Anchor href='#' className="teamcomp-blue">
                    Profile
                  </Anchor>
                  <Anchor href='#' className="teamcomp-blue">
                    Change Password
                  </Anchor> */}
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
    } else {
      return (
        <Header justify="center" colorIndex="grey-1">
          <Box direction="row"
              responsive={false}
              justify="start"
              align="center"
              pad={{horizontal: 'medium'}}
              flex="grow">
            <GrommetIcon className="brand-logo" size="large" />
            <Box pad="small" />

            <Box flex="grow" align="end">
              <Menu label="Menu" inline={true} direction="row" flex="grow">
                <NavAnchor path="/login">Login</NavAnchor>
                {/* <NavAnchor path="/register">Register</NavAnchor> */}
              </Menu>
            </Box>
          </Box>
        </Header>
      );
    }
  }
}

export default AppHeader;
