import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

import Auth from '../../lib/Auth';

const Navbar = ({ history, title }) => {
  function logout(e) {
    axios
      .put('/api/logout', {}, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => {
        Auth.removeToken();
        history.push('/');
      });
  }

  return(
    <header>
      <nav>
        <ul>
          <li>
            <Link to={`/users/${Auth.getPayload().id}`}>
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </Link>
          </li>
          <li onClick={ logout }>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </li>
        </ul>
      </nav>
      <div className="banner">
        { history.location.pathname !== '/chats' && <div className="back" onClick={ () => history.goBack() }> 
          <i className="fa fa-angle-left" aria-hidden="true"></i>
        </div> }
        <h1>{ title }</h1>
        <hr />
      </div>
    </header>
  );
};

export default withRouter(Navbar);