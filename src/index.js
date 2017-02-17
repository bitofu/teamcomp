import React from 'react';
import ReactDOM from 'react-dom';
import { watchAuthData } from './actions/Auth';
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
import MyLeagues from './views/MyLeagues';
import HowToPlay from './views/HowToPlay';

import 'grommet/scss/vanilla/index.scss';

function requireAuth(nextState, replace) {
  watchAuthData(nextState, replace);
}

const root = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Lobby} onEnter={requireAuth}/>
      <Route path="login" component={Login} />
      {/* <Route path="register" component={Register} /> */}
      <Route path="lobby" component={Lobby} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="league/:leagueKey" component={League} onEnter={requireAuth} />
      <Route path="myleagues" component={MyLeagues} onEnter={requireAuth} />
      <Route path="collection" component={Collection} onEnter={requireAuth} />
      <Route path="schedules" component={Schedules} onEnter={requireAuth} />
      <Route path="store" component={Store} onEnter={requireAuth} />
      <Route path="packs" component={Packs} onEnter={requireAuth} />
      <Route path="openpack/:packKey" component={Openpack} onEnter={requireAuth} />
      <Route path="howtoplay" component={HowToPlay} onEnter={requireAuth} />
      {/* <Route path="about" component={About} /> */}
      {/* <Route path="*" component={NoMatch}/> */}
    </Route>
  </Router>
);

ReactDOM.render(root, document.getElementById('root'));
