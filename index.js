const express         = require('express');
const morgan          = require('morgan');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const bluebird        = require('bluebird');
const app             = express();

const { port, dbURI } = require('./config/environment');
const routes          = require('./config/routes');

mongoose.Promise      = bluebird;
mongoose.connect(dbURI, { useMongoClient: true });

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => console.log(`Express is listening on port ${port}`));