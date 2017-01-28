import React, { Component } from 'react';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import Anchor from 'grommet/components/Anchor';
import SocialTwitterIcon from 'grommet/components/icons/base/SocialTwitter';
import MoneyIcon from 'grommet/components/icons/base/Money';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Paragraph from 'grommet/components/Paragraph';
import CheckBox from 'grommet/components/CheckBox';


// Test data - will move to a db
const userFunds = 1000;
const packData = {
  'onePack': {
    price: 200,
    quantity: 1
  },
  'fivePack': {
    price: 500,
    quantity: 5
  },
  'fifteenPack': {
    price: 1500,
    quantity: 15
  },
  'thirtyPack': {
    price: 3000,
    quantity: 30
  },
  'fiftyPack': {
    price: 5000,
    quantity: 50
  }
};

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationPopup: false,
      packPrice: 0,
      packQuantity: 0
    };
    this._onClickBuy = this._onClickBuy.bind(this);
  }

  _onClickBuy(packPrice, packQuantity) {
    this.setState({
      confirmationPopup: true,
      packPrice: packPrice,
      packQuantity: packQuantity
    });
  }

  closePopup(e) {
    e.stopPropagation();
    this.setState({ confirmationPopup:false });
  }

  purchasePack(e, packPrice, packQuantity) {
    e.stopPropagation();
    e.preventDefault();

    // TODO: Do calcution and deduct from user funds
    if (userFunds < packPrice) return;
    let newUserFunds = userFunds - packPrice;
    console.log(newUserFunds);
    console.log(packPrice);
    console.log(packQuantity);

    // TODO: Update new user funds

    // TODO: Add card packs to user collection
  }

  render() {
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
                  onClick={(e) => { this.closePopup(e) }} />
              </Box>
            </Footer>
          </Form>
        </Layer>
      : null;

    const listPacks = Object.keys(packData).map((key) =>
      <Tile key={key}>
        <Card thumbnail='/img/carousel-1.png'
          margin="small"
          contentPad="small"
          direction="column"
          heading='Classic'
          label='League of Legends'
          link={
            <Anchor disabled={ packData[key].price <= userFunds ? false : true }
                   onClick={ packData[key].price <= userFunds ? this._onClickBuy.bind(this, packData[key].price, packData[key].quantity) : null }
                   label={'Buy for ' + packData[key].price + 'g'}
                   icon={<MoneyIcon />} />
          }
          description={packData[key].quantity + ' Classic Pack'} />
      </Tile>
    );

    return (
      <Box>
        { confirmationPopup }
        <Tiles selectable={true}
          fill={false}
          flush={false}>
          { listPacks }
        </Tiles>
      </Box>
    );
  }
}

export default Store;
