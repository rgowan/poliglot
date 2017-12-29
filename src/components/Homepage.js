import React    from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="centered">
        <h1>Flip Chat</h1>
        <h2>Break the language barrier</h2>

        <Link className="button" to="/register">Signup</Link>
        <Link className="button" to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Homepage;