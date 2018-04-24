import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="centered">
        <img src="/assets/images/logo.png" />
        <h1>Poliglot</h1>
        <h2>Break the language barrier</h2>

        <Link className="button register" to="/register">Create an account</Link>
        <Link className="button login" to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Homepage;