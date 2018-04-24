import React from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

const Navbar = ({ history, title, colloctor }) => {
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
        { history.location.pathname !== '/chats' && 
          <div className="back" onClick={ () => history.goBack() }> 
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </div> 
        }
        <span>
          <h1>
            { title } 
            { colloctor && 
              <span className={colloctor.online ? 'online-dot' : ''}>
                <i className="fa fa-circle" aria-hidden="true"></i>
              </span> 
            }
          </h1>
          { colloctor && <Link to={`/users/${colloctor.id}`}>View profile</Link> }
        </span>
        <hr />
      </div>
    </header>
  );
};

export default withRouter(Navbar);