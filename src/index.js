import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index'

import './index.css';
import './about.css';


import Firebase, { FirebaseContext } from "./components/Firebase"

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
  <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
)

// serviceWorker.unregister()
