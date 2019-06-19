import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import TweetLogin from './components/tweet-login';
import Loading from './components/loading'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
require('dotenv').config()

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/index' component={App} />
      <Route path='/tweet-login' component={TweetLogin} />
      <Route path='/load' component={() => <Loading loading />} />
    </div>
  </Router>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App').default;
    ReactDOM.render(
      <NextApp />
      document.getElementById('root')
    );
  });
} 
*/