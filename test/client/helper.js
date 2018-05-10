require('babel-register')();

process.env.NODE_ENV = 'test';

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const chai = require('chai');

Enzyme.configure({ adapter: new Adapter() });

global.should = chai.should();
global.expect = chai.expect;

global.shallow = require('enzyme').shallow;
global.mount = require('enzyme').mount;

// require('babel-register')();

// const chai      = require('chai');
// global.should   = chai.should();
// global.expect   = chai.expect;

// const jsdom = require('jsdom').jsdom;
// var exposedProperties = ['window', 'navigator', 'document'];

// global.document = jsdom('');
// global.window = document.defaultView;

// Object.keys(document.defaultView).forEach((property) => {
//  if (typeof global[property] === 'undefined') {
//   exposedProperties.push(property);
//   global[property] = document.defaultView[property];
//  }
// });

// global.navigator = {
//  userAgent: 'node.js'
// };

// documentRef = document;



