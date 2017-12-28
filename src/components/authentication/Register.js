import React from 'react';

const Register = () => {
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
         <hr />
         <div>
          <button className="button submit">Signup</button>
         </div>
       </form>
      </div>
    </div>
  );
}

export default Register;