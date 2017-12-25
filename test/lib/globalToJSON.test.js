/* globals api, expect, describe, it */
require('../spec_helper');

const globalToJSON    = require('../../lib/globalToJSON');

describe('globalToJSON', () => {
  it('should be function', done => {
    expect(globalToJSON).to.be.a('function');
    done();
  });
});