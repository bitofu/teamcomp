import React, { Component } from 'react';
import { getUserPacksAndCurrency } from '../actions/User';
import { getPackData, purchasePack } from '../actions/Packs';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Anchor from 'grommet/components/Anchor';
import MoneyIcon from 'grommet/components/icons/base/Money';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';
import Paragraph from 'grommet/components/Paragraph';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationPopup: false,
      packPrice: 0,
      packQuantity: 0,
      packData: [],
      userGold: 0,
      unopenedPacks: 0,
      currentUid: null,
      isViewReady: false
    };
    this._onClickBuy = this._onClickBuy.bind(this);
  }

  componentWillMount() {
    getUserPacksAndCurrency((userData) => {
      this.setState({
        currentUid: userData.uid,
        userGold: userData.gold,
        unopenedPacks: userData.unopenedPacks
      });
    });
    getPackData((packData) => {
      this.setState({
        packData: packData,
        isViewReady: true
      });
    })
  }

  _onClickBuy(packPrice, packQuantity) {
    this.setState({
      confirmationPopup: true,
      packPrice: packPrice,
      packQuantity: packQuantity
    });
  }

  _closePopup(e) {
    e.stopPropagation();
    this.setState({ confirmationPopup: false });
  }

  purchasePack(e, packPrice, packQuantity) {
    e.stopPropagation();
    const { userGold, unopenedPacks } = this.state;
    purchasePack(userGold, unopenedPacks, packPrice, packQuantity);
  }

  render() {
    // Move into smaller reusable component
    const confirmationPopup = (this.state.confirmationPopup)
      ? <Layer closer={true} flush={false} onClose={ () => { this.setState({ confirmationPopup:false }) } }>
          <Form pad='large'>
            <Header>
              <Heading tag="h2">
                Purchase Confirmation
              </Heading>
            </Header>
            <FormFields>
              <fieldset>
                <Paragraph>
                  You must acknowledge that your funds will be deducted by the pack price.
                </Paragraph>
              </fieldset>
            </FormFields>
            <Footer pad={{"vertical": "medium"}}>
              <Box>
                <Button label='Buy'
                  type='submit'
                  primary={true}
                  onClick={(e) => { this.purchasePack(e, this.state.packPrice, this.state.packQuantity) }} />
              </Box>
              <Box pad={{"horizontal": "medium"}}>
                <Button label='Cancel'
                  type='reset'
                  primary={false}
                  onClick={(e) => { this._closePopup(e) }} />
              </Box>
            </Footer>
          </Form>
        </Layer>
      : null;

    // Move into smaller reusable component
    const { isViewReady, packData, userGold } = this.state;
    const listPacks = Object.keys(packData).map((key) =>
      <Tile key={key}>
        <Card thumbnail='https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/packs%2Fleagueoflegends.jpg?alt=media'
          className="card-pack"
          margin="small"
          contentPad="large"
          direction="column"
          heading={packData[key].quantity + ' Classic Pack'}
          label='League of Legends'
          link={
            <Anchor disabled={ packData[key].price <= userGold ? false : true }
                   onClick={ packData[key].price <= userGold ? this._onClickBuy.bind(this, packData[key].price, packData[key].quantity) : null }
                   label={'Buy for ' + packData[key].price + 'g'}
                   icon={<MoneyIcon />} />
          }
          description={packData[key].quantity * 5 + ' Cards'} />
      </Tile>
    );

    if (isViewReady) {
      return (
        <Box full={true} colorIndex="light-2">
          { confirmationPopup }
          <Tiles selectable={false}
            fill={true}
            flush={false}>
            { listPacks }
          </Tiles>
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

export default Store;
