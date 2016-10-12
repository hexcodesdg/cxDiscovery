import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import getRoutes from './routes'
import configureStore from './store'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


ReactDOM.render(
  <Provider store={configureStore({})}>
    <Router routes={getRoutes()} history={browserHistory}/>
  </Provider>,
  document.getElementById('root')
);
