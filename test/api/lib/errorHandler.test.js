require('../spec_helper');

const errorHandler = require('../../../lib/errorHandler');

describe('errorHandler', () => {
  it('should be a function', done => {
    expect(errorHandler).to.be.a('function');
    done();
  });

  it('should return 422 unprocessable entity if validation error', done => {
    api
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({
        name: {
          first: 'test',
          last: 'test'
        }
      })
      .end((err, res) => {
        expect(res.status).to.eq(422)
        expect(res.body).to.be.an('object');
        expect(Object.keys(res.body)).to.include('message');
        expect(res.body.message).to.eq('Unprocessable Entity');
        done();
      });
  });
});