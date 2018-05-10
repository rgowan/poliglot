require('../helper');

const User = require('../../../models/user');

describe('User model tests', () => {
  it('should be invalid if first is empty', done => {
    const user = new User();
    
    user.validate(err => {
      expect(err.errors['first']).to.exist;
      done();
    });
  });

  it('should be invalid if last is empty', done => {
    const user = new User();

    user.validate(err => {
      expect(err.errors['last']).to.exist;
      done();
    });
  });

  it('should be invalid if email is empty', done => {
    const user = new User();

    user.validate(err => {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if password is empty', done => {
    const user = new User();

    user.validate(err => {
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it('user instance should have a function validatePassword', done => {
    const user = new User({
      username: 'person',
      email: 'test@test.com',
      password: 'password',
      passwordConfirmation: 'password'
    });

    expect(user.validatePassword).to.be.a('function');
    done();
  });
});