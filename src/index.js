import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
require('dotenv').config()

ReactDOM.render(
  <App />,
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