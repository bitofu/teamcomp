import React, { Component } from 'react';
import firebase from 'firebase';
import GrommetApp from 'grommet/components/App';
import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null
    };
  }

  componentWillMount() {
    let userDataRef = firebase.database().ref("users");
    userDataRef.on("value", function(dataSnapshot) {
      // replace with logged in user
      let userData = dataSnapshot.val().alex;
      this.setState({
        userData: userData
      });
    }.bind(this));
  }

  render() {
    return (
      <GrommetApp centered={false}>
        <Header />
        {this.props.children}
        {/* {React.cloneElement(this.props.children, { userData: this.state.userData })} */}
      </GrommetApp>
    );
  }
}

export default App;
