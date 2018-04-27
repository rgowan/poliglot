require('../spec_helper');

const customResponses = require('../../../lib/customResponses');

describe('customResponses', () => {
  it('should be a function', done => {
    expect(customResponses).to.be.a('function');
    done();
  });

  it('should return 404 and message if route not found', done => {
    api
      .get('/api/tests')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        expect(res.body).to.be.an('object');
        expect(Object.keys(res.body)).to.include('message');
        expect(res.body.message).to.eq('Not Found');
        done();
      });
  });

  it('should return 401 and message if unauthorized', done => {
    api
    .get('/api/users')
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.eq(401)
      expect(res.body).to.be.an('object');
      expect(Object.keys(res.body)).to.include('message');
      expect(res.body.message).to.eq('Unauthorized');
      done();
    })
  });
});