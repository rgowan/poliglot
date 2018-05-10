import React from 'react';

const LoginForm = ({
  handleChange,
  handleSubmit
}) => {
  return(
    <div className="centered">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        
        <div>
          <label htmlFor="email">Email</label>
          <input 
            onChange={handleChange} 
            type="email"
            name="email" 
            id="email" 
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            onChange={handleChange}
            type="password" 
            name="password" 
            id="password"
          />
        </div>
        <div>
          <button className="button submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;