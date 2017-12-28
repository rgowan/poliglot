import React from 'react';

const Login = () => {
  return (
    <div className="authentication">
      <div className="centered">
       <h1>Login</h1>

       <form>
         <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
         </div>
         <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
         </div>
         <hr />
         <div>
          <button className="button submit">Login</button>
         </div>
       </form>
      </div>
    </div>
  );
}

export default Login;