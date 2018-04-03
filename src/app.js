import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'font-awesome/css/font-awesome.css';
import 'animate.css/animate.css';
import './scss/style.scss';

import Routes from './components/utility/Routes';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);