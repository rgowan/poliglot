import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'font-awesome/css/font-awesome.css';
import './scss/style.scss';

import Routes from './components/utility/Routes';

class App extends React.Component {
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