import React from 'react';
import { Link } from 'react-router'
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';
import MoneyIcon from 'grommet/components/icons/base/Money';
import CurrencyIcon from 'grommet/components/icons/base/Currency';
import Edit from 'grommet/components/icons/base/Edit';
import SearchIcon from 'grommet/components/icons/base/Search';
import NavAnchor from './NavAnchor';

export default function AppHeader (props) {
  return (
    <Header justify="center" colorIndex="neutral-4">
      <Box size={{width: {max: 'xxlarge'}}}
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
            <Anchor icon={<MoneyIcon />}
              label={'1000'}
              animateIcon={true}
              primary={false}
              reverse={false}
              disabled={false} />
            <Anchor icon={<CurrencyIcon />}
              label={'100'}
              animateIcon={true}
              primary={false}
              reverse={false}
              disabled={false} />
          </Menu>
        </Box>
      </Box>
    </Header>
  );
};
