const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const rp         = require('request-promise');

const { dbURI } = require('../config/environment');
const User      = require('../models/user');

mongoose.connect(dbURI, { useMongoClient: true });

User.collection.drop();

rp('https://randomuser.me/api/?results=10&nat=gb')
  .then(data => {
    const { results } = JSON.parse(data);

    results.forEach(result => {
      User.create({ 
        username: result.name.first,
        name: {
          first: result.name.first,
          last: result.name.last
        },
        image: result.picture.large,
        email: `${result.name.first}@${result.name.first}.com`,
        password: 'password',
        passwordConfirmation: 'password'
      });

      console.log('User was created');
    });
  })
  .catch(err => console.log(err));
