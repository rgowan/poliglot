import React from 'react';

class Register extends React.Component {
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
          <h1>Signup</h1>
          <form>
            <div>
              <label htmlFor="first">First Name *</label>
              <input type="text" name="first" id="first" />
            </div>
            <div>
              <label htmlFor="last">Last Name *</label>
              <input type="text" name="last" id="last" />
            </div>
            <div>
              <label htmlFor="email">Email *</label>
              <input type="text" name="email" id="email" />
            </div>
            <div>
              <label htmlFor="image">Profile Picture</label>
              <input type="text" name="image" id="image" />
            </div>
            <div>
              <label htmlFor="password">Password *</label>
              <input type="password" name="password" id="password" />
            </div>
            <div>
              <label htmlFor="passwordConfirmation">Password Confirmation *</label>
              <input type="password" name="passwordConfirmation" id="passwordConfirmation" />
            </div>
            <div>
              <button className="button submit" onClick={this.handleClick}>Signup</button>
            </div>
          </form>
        </div>
      </div>
    );
  } 
}

export default Register;
