require('../helper');

const User = require('../../../models/user');

describe('User Controller', () => {
  beforeEach(done => {
    User.collection.remove();
    done();
  });

  afterEach(done => {
    User.collection.remove();
    done();
  });

  describe('GET /api/users', () => {
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

    it('should return a 200 response', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

    it('should return a JSON object', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should return an array', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an array of users objects', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .to.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              '_id',
              'id',
              'first',
              'last',
              'fullname',
              'image',
              'online',
              'email',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });

    it('should have properties: id, first, last, fullname, image, email', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          const user = res.body[0];
          expect(user)
            .to.have.property('id')
            .and.to.be.a('string');
          expect(user)
            .to.have.property('first')
            .and.to.be.a('string');
          expect(user)
            .to.have.property('last')
            .and.to.be.a('string');
          expect(user)
            .to.have.property('fullname')
            .and.to.be.a('string');
          expect(user)
            .to.have.property('image')
            .and.to.be.a('string');
          expect(user)
            .to.have.property('email')
            .and.to.be.a('string');
          done();
        });
    });
  });

  describe('GET /api/users/:id', () => {
    let testUser = null;
    let token    = null;

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
          testUser = res.body.user;
          token    = res.body.token;
          done();
        });
    });

    it('should return a 200 response', done => {
      api
        .get(`/api/users/${testUser.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

    it('should return an object', done => {
      api
        .get(`/api/users/${testUser.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          done();
        });
    }); 
    
    it('should return a JSON object', done => {
      api
        .get(`/api/users/${testUser.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.header['content-type']).to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should return an object with user properties', done => {
      api
        .get(`/api/users/${testUser.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .and.have.all.keys([
              '_id',
              'id',
              'first',
              'last',
              'fullname',
              'image',
              'online',
              'email',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });

    it('should return a 500 with incorrect id param', done => {
      api
        .get(`/api/users/testing123`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(500, done);        
    });
  });
});