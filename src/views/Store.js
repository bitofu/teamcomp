import React, { Component } from 'react';
import { getPackData, purchasePack } from '../actions/Packs';
import { observer } from 'mobx-react';
import userStore from '../stores/User';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import MoneyIcon from 'grommet/components/icons/base/Money';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';
import Paragraph from 'grommet/components/Paragraph';
import NowLoading from './NowLoading';

@observer
class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationPopup: false,
      packPrice: 0,
      packQuantity: 0,
      packData: [],
      currentUid: null,
      isViewReady: false
    };
    this._onClickBuy = this._onClickBuy.bind(this);
  }

  componentWillMount() {
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
    purchasePack(userStore.gold, userStore.unopenedPacks, packPrice, packQuantity);
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
    const { isViewReady, packData } = this.state;
    const listPacks = Object.keys(packData).map((key) =>
      <Tile key={key}>
        <Card thumbnail='https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/packs%2Fleagueoflegends.jpg?alt=media'
          className="card-pack"
          margin="small"
          contentPad="medium"
          direction="column"
          heading={packData[key].quantity + ' Classic Pack'}
          label='League of Legends'
          link={
            <Anchor disabled={ packData[key].price <= userStore.gold ? false : true }
                   onClick={ packData[key].price <= userStore.gold ? this._onClickBuy.bind(this, packData[key].price, packData[key].quantity) : null }
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
        <NowLoading />
      );
    }
  }
}

export default Store;
