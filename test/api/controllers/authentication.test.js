require('../helper');

const User = require('../../../models/user');

describe('Authentication Controller', () => {
  beforeEach(done => {
    User.collection.remove();
    done();
  });

  afterEach(done => {
    User.collection.remove();
    done();
  });

  describe('POST /api/login', () => {
    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          first: 'test',
          last: 'test',
          image: 'http://www.fillmurray.com/300/300',
          email: 'test@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end(() => {
          done();
        });
    });

    it('should login a user with the correct credentials', done => {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Welcome back');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('should not login a user without an email', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unauthorized');
          expect(Object.keys(res.body)).to.not.include('token');
          done();
        });
    });

    it('should not login a user with incorrect password', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'passwordd'
        })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unauthorized');
          expect(Object.keys(res.body)).to.not.include('token');
          done();
        });
    });
  });

  describe('POST /api/register', () => {
    it('should register a user providing the correct credentials', done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          first: 'test',
          last: 'test',
          image: 'http://www.fillmurray.com/300/300',
          email: 'test@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Welcome');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    describe('Checking for required user fields', () => {
      it('should not register a user without a email', done => {
        api
          .post('/api/register')
          .set('Accept', 'application/json')
          .send({
            first: 'test',
            last: 'test',
            image: 'http://www.fillmurray.com/300/300',
            password: 'password',
            passwordConfirmation: 'password'
          })
          .end((err, res) => {
            expect(res.status).to.eq(422);
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.eq('Unprocessable Entity');
            expect(res.body.errors).to.be.a('object');
            expect(Object.keys(res.body.errors)).to.include('email');
            expect(res.body.errors.email).to.eq('Path `email` is required.');
            done();
          });
      });
  
      it('should not register a user without a first name', done => {
        api
          .post('/api/register')
          .set('Accept', 'application/json')
          .send({
            last: 'test',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test@test.com',
            password: 'password',
            passwordConfirmation: 'password'
          })
          .end((err, res) => {
            expect(res.status).to.eq(422);
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.eq('Unprocessable Entity');
            expect(res.body.errors).to.be.a('object');
            expect(Object.keys(res.body.errors)).to.include('first');
            expect(res.body.errors['first']).to.eq('Path `first` is required.');
            done();
          });
      });
  
      it('should not register a user without a last name', done => {
        api
          .post('/api/register')
          .set('Accept', 'application/json')
          .send({
            first: 'test',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test@test.com',
            password: 'password',
            passwordConfirmation: 'password'
          })
          .end((err, res) => {
            expect(res.status).to.eq(422);
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.eq('Unprocessable Entity');
            expect(res.body.errors).to.be.a('object');
            expect(Object.keys(res.body.errors)).to.include('last');
            expect(res.body.errors['last']).to.eq('Path `last` is required.');
            done();
          });
      });
  
      it('should not register a user without a password', done => {
        api
          .post('/api/register')
          .set('Accept', 'application/json')
          .send({
            first: 'test',
            last: 'test',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test@test.com'
          })
          .end((err, res) => {
            expect(res.status).to.eq(422);
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.eq('Unprocessable Entity');
            expect(res.body.errors).to.be.a('object');
            expect(Object.keys(res.body.errors).length).to.eq(1);
            expect(Object.keys(res.body.errors)).to.include('password');
            expect(res.body.errors.password).to.eq('Path `password` is required.');
            done();
          });
      });
  
      it('should not register a user if password and passwordConfirmation do not match', done => {
        api
          .post('/api/register')
          .set('Accept', 'application/json')
          .send({
            first: 'test',
            last: 'test',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test@test.com',
            password: 'password',
            passwordConfirmation: 'passwordd'
          })
          .end((err, res) => {
            expect(res.status).to.eq(422);
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.eq('Unprocessable Entity');
            expect(res.body.errors).to.be.a('object');
            expect(Object.keys(res.body.errors)).to.include('passwordConfirmation');
            expect(res.body.errors.passwordConfirmation).to.eq('Passwords do not match');
            done();
          });
      });
    });

    describe('checking for unique user fields', () => {
      beforeEach(done => {
        api
          .post('/api/register')
          .set('Accept', 'application/json')
          .send({
            first: 'test',
            last: 'test',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test@test.com',
            password: 'password',
            passwordConfirmation: 'password'
          })
          .then(() => done())
          .catch(() => done());
      });
  
      it('should not register a user with a duplicate email', done => {
        api
          .post('/api/register')
          .set('Accept', 'application/json')
          .send({
            first: 'test',
            last: 'test',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test@test.com',
            password: 'password',
            passwordConfirmation: 'password'
          })
          .end((err, res) => {
            expect(res.status).to.eq(422);
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.eq('Unprocessable Entity');
            expect(res.body.errors).to.be.a('object');
            expect(Object.keys(res.body.errors)).to.include('email');
            expect(res.body.errors.email).to.eq('Error, expected `email` to be unique. Value: `test@test.com`');
            done();
          });
      });
    });
  });

  describe('PUT /api/logout', () => {
    let token = null;

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          first: 'test',
          last: 'test',
          image: 'http://www.fillmurray.com/300/300',
          email: 'test@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    afterEach(done => {
      User.collection.drop();
      done();
    });

    it('should log out logged in user', done => {
      api
        .put('/api/logout')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.eq(204);
          done();
        });
    });
  });
});