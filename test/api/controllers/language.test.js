require('../helper');

const Language = require('../../../models/language');
const User     = require('../../../models/user');

describe('Language Controller', () => {
  beforeEach(done => {
    Language.collection.remove();
    User.collection.remove();
    done();
  });

  afterEach(done => {
    Language.collection.remove();
    User.collection.remove();
    done();
  });

  describe('GET /api/languages', () => {
    let token = null;

    beforeEach(done => {
      Language.create({
        name: 'French',
        code: 'fr',
        emoji: 'fr'
      })
      .then(() => {
        return User.create({
          first: 'test1',
          last: 'test1',
          image: 'http://www.fillmurray.com/300/300',
          email: 'test1@test1.com',
          password: 'password',
          passwordConfirmation: 'password'
        });
      })
      .then(() => {
        api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test1@test1.com',
          password: 'password'
        })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
      });
    });

    it('should return a 200 response', done => {
      api
        .get('/api/languages')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

    it('should return a JSON object', done => {
      api
        .get('/api/languages')
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
        .get('/api/languages')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an array of users objects', done => {
      api
        .get('/api/languages')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .to.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              '_id',
              'id',
              'name',
              'code',
              'emoji',
            ]);
          done();
        });
    });

    it('should have properties: id, name, code, emoji', done => {
      api
        .get('/api/languages')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          const language = res.body[0];
          expect(language)
            .to.have.property('id')
            .and.to.be.a('string');
          expect(language)
            .to.have.property('name')
            .and.to.be.a('string');
          expect(language)
            .to.have.property('code')
            .and.to.be.a('string');
          expect(language)
            .to.have.property('emoji')
            .and.to.be.a('string');
          done();
        });
    });
  });
});