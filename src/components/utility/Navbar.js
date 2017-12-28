import React from 'react';
import { withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';

const Navbar = ({ history, title }) => {
  function logout(e) {
    Auth.removeToken();
    history.push('/');
  }


  return(
    <header>
      <nav>
        <ul>
          <li>
            <i className="fa fa-user-circle" aria-hidden="true"></i>
          </li>
          <li onClick={ logout }>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </li>
        </ul>
      </nav>
      <h1>{ title }</h1>
      <hr />
    </header>
  );
};

export default withRouter(Navbar);