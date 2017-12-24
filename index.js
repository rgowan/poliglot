const express         = require('express');
const morgan          = require('morgan');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const bluebird        = require('bluebird');

const app             = express();
const environment     = app.get('env');

mongoose.Promise      = bluebird;
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.plugin(require('mongoose-unique-validator'));

const { port, db } = require('./config/environment');
const routes          = require('./config/routes');
const customResponses = require('./lib/customResponses');
const errorHandler    = require('./lib/errorHandler');

mongoose.connect(db[environment], { useMongoClient: true });

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.use(customResponses);
app.use('/api', routes);
app.use(errorHandler);

if (environment !== 'test') app.listen(port, () => console.log(`Express is alive and running on port: ${port}`));

module.exports = app;