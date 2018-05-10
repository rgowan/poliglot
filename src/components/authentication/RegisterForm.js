import React from 'react';
import ReactFilestack from 'filestack-react';
import emoji from 'emoji-dictionary';

const RegisterForm = ({
  handleChange,
  handleImageUpload,
  handleSubmit,
  languages,
  user
}) => {
  return(
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        
        <div>
          <label htmlFor="first">First Name *</label>
          <input 
            onChange={handleChange}
            type="text" 
            name="first" 
            id="first" 
          />
        </div>
        <div>
          <label htmlFor="last">Last Name *</label>
          <input 
            onChange={handleChange}
            type="text" 
            name="last" 
            id="last" 
          />
        </div>
        <div>
          <label htmlFor="email">Email *</label>
          <input 
            onChange={handleChange}
            type="email" 
            name="email" 
            id="email"
          />
        </div>
        <div>
          <label htmlFor="email">Language *</label>
            <select 
              onChange={handleChange} 
              name="language" 
              value={user.language}
            >
              <option value='' disabled="true">Please select a language</option>
              { languages.map((language, i) => 
                <option key={i} value={ language.id }>{ emoji.getUnicode(`${language.emoji}`) } { language.name }</option>
              )}
            </select> 
        </div>
        <div>
          <label htmlFor="image">Profile Picture { user.image && <i class="fa fa-check"></i> }</label>
          <ReactFilestack
            apikey="AIuCIUuXNTxasxVkblVY6z"
            buttonText={ user.image ? "Change Photo" : "Choose Photo"}
            buttonClass="button file"
            onSuccess={handleImageUpload}
          />
        </div>
        <div>
          <label htmlFor="password">Password *</label>
          <input 
            onChange={handleChange}
            type="password" 
            name="password" 
            id="password"
          />
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Password Confirmation *</label>
          <input
            onChange={handleChange} 
            type="password" 
            name="passwordConfirmation" 
            id="passwordConfirmation"
          />
        </div>
        <div>
          <button className="button submit">Signup</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;