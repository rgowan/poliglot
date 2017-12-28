import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = e => {
    e.preventDefault();
    this.props.history.push('/chats');
  }

  render() {
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
            <div>
             <button className="button submit" onClick={this.handleClick}>Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  } 
}

export default Login;
