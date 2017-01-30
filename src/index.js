import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { Router, browserHistory } from 'react-router';
import { routes } from './Routes';

import 'grommet/scss/vanilla/index.scss';

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

ReactDOM.render((
  <Router routes={routes} history={browserHistory} />
  ),
  document.getElementById('root')
);
