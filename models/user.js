const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const userSchema = new mongoose.Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  image: { type: String },
  online: { type: Boolean },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},
{
  timestamps: true
});

userSchema
  .virtual('fullname')
  .get(function() {
    return `${this.first} ${this.last}`;
  })

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password')) {
    if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'Passwords do not match');
    }
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
