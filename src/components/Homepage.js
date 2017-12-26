import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="centered">
        <h1>Flip Chat</h1>
        <h2>Break the language barrier</h2>

        {/* <button>Login</button>
        <button>Signup</button> */}

        <Link className="button" to="/login">Login</Link>
        <Link className="button" to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Homepage;