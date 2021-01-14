const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
var database = require('./config/database');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
  
mongoose.connect(database.url); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

require('./app/routes')(app);

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;