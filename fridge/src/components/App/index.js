import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
 
import Navigation from '../Navigation/index';
 
function App(){
    return(
  <Router>
    <Navigation />
  </Router>
    )
}
 
export default App;