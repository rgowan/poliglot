import React from 'react';

const Login = () => {
  return (
    <div className="login">
      <div className="centered">
       <h1>Login</h1>

       <form>
         <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
         </div>
         <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
         </div>
         <hr />
         <div className="input-group">
          <button>Login</button>
         </div>
       </form>
      </div>
    </div>
  );
}

export default Login;