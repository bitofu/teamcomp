import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Login from './views/Login';
import Lobby from './views/Lobby';
import Collection from './views/Collection';
import Schedules from './views/Schedules';
import Store from './views/Store';
import League from './views/League';
import Packs from './views/Packs';
import Openpack from './views/Openpack';

import 'grommet/scss/vanilla/index.scss';

// Should remove these and have them in config file
const config = {
  apiKey: "AIzaSyDZGQ_J3rRDhIAJlmwFsn_e7az1Uwpbvt0",
  authDomain: "teamcomp-fecc4.firebaseapp.com",
  databaseURL: "https://teamcomp-fecc4.firebaseio.com",
  storageBucket: "teamcomp-fecc4.appspot.com"
};

const fb = firebase
  .initializeApp(config)
  .database()
  .ref();

function requireAuth(nextState, replace) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      console.log(user);
    } else {
      // No user is signed in.
      replace({
        pathname: '/login'
      });
    }
  });
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Lobby} onEnter={requireAuth}/>
      <Route path="login" component={Login} />
      {/* <Route path="register" component={Register} /> */}
      <Route path="lobby" component={Lobby} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="league/:leagueKey" component={League} onEnter={requireAuth} />
      <Route path="collection" component={Collection} onEnter={requireAuth} />
      <Route path="schedules" component={Schedules} onEnter={requireAuth} />
      <Route path="store" component={Store} onEnter={requireAuth} />
      <Route path="packs" component={Packs} onEnter={requireAuth} />
      <Route path="openpack/:packKey" component={Openpack} onEnter={requireAuth} />
      {/* <Route path="about" component={About} /> */}
      {/* <Route path="*" component={NoMatch}/> */}
    </Route>
  </Router>
  ),
  document.getElementById('root')
);
