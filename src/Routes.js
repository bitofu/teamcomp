import App from './App';
import Lobby from './views/Lobby';
import Collection from './views/Collection';
import Schedules from './views/Schedules';
import Store from './views/Store';
import League from './views/League';

export let routes = [
  { path: '/', component: App, indexRoute: { component: Lobby },
    childRoutes: [
      { path: 'lobby', component: Lobby },
      { path: 'league/:leagueKey', component: League },
      { path: 'collection', component: Collection },
      { path: 'schedules', component: Schedules },
      { path: 'store', component: Store },
    ]
  }
];
