/* globals api, expect, describe, it */
require('../spec_helper');

const errorHandler    = require('../../lib/errorHandler');
const customResponses = require('../../lib/customResponses');
const globalToJSON    = require('../../lib/globalToJSON');
const secureRoute     = require('../../lib/secureRoute');

describe('Lib files', () => {
  describe('errorHandler', () => {
    it('should be a function', done => {
      expect(errorHandler).to.be.a('function');
      done();
    });
  });

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
        })
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
    })
  });

  describe('globalToJSON', () => {
    it('should be function', done => {
      expect(globalToJSON).to.be.a('function');
      done();
    });
  });

  describe('secureRoute', () => {
    it('should be function', done => {
      expect(secureRoute).to.be.a('function');
      done();
    });

    it('should return 401 unauthorized if no Authorization hearder for secure route', done => {
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

    it('should return 401 unauthorized if no user id is present inside token', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhM2ZjNWZlZmQxZTAyMzMzZGI4NzAyNSIsImlhdCI6MTUxNDE5ODg2OCwiZXhwIjoxNTE0MjAyNDY4fQ.EvOm_cSFPO6LB4tiRAczXP8QdGFizmUalDvzmnrymX4`)
        .end((err, res) => {
          expect(res.status).to.eq(401)
          expect(res.body).to.be.an('object');
          expect(Object.keys(res.body)).to.include('message');
          expect(res.body.message).to.eq('Unauthorized');
          done();
        })
    })
  });
});