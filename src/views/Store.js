import React, { Component } from 'react';
import firebase from 'firebase';
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
      currentUid: null
    };
    this._onClickBuy = this._onClickBuy.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        let currentUid = user.uid;
        this.setState({
          currentUid: currentUid
        });

        // Get user data
        let userDataRef = firebase.database().ref("users/" + currentUid);
        userDataRef.on("value", function(dataSnapshot) {
          let userGold = dataSnapshot.val().gold;
          let unopenedPacks = dataSnapshot.val().unopenedPacks;
          this.setState({
            userGold: userGold,
            unopenedPacks: unopenedPacks
          });
        }.bind(this));

        // Get pack data
        let packDataRef = firebase.database().ref("packData");
        packDataRef.on("value", function(dataSnapshot) {
          let packData = [];
          packData = dataSnapshot.val();
          this.setState({
            packData: packData
          });
        }.bind(this));
      }
    });
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
    // e.preventDefault();
    const { userGold, unopenedPacks, currentUid } = this.state;

    // Do calcution and deduct from user funds
    if (userGold < packPrice) return;
    const newUserGold = userGold - packPrice;

    // Add packQuantity to current unopenedPacks
    const newUnopenedPacks = unopenedPacks + packQuantity;

    // Update new user funds and add card packs to user collection
    var fbUpdate = {};
    // Replace with logged in user
    fbUpdate['/users/' + currentUid + '/gold'] = newUserGold;
    fbUpdate['/users/' + currentUid + '/unopenedPacks'] = newUnopenedPacks;

    // save all to firebase
    firebase.database().ref().update(fbUpdate);
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

    const { packData, userGold } = this.state;
    console.log(packData);
    console.log(userGold);
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
  }
}

export default Store;
