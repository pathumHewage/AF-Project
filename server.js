var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path') 

const errorHandler = require('./_helpers/error-handler');

require('dotenv').config({path: __dirname + '/.env'})

/* import *
  *  routes *
    *    here */
const UserRoutes = require('./routes/user-routes');
const EditorRoutes = require('./routes/editor-routes');
const ReviewerRoutes = require('./routes/reviewer-routes');
const AdminRoutes = require('./routes/admin-router');

const connectionString = process.env['MONGO_DB'];


app = express(),
port = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

/* global *
  *  error *
    *    handler */
app.use(errorHandler);

/* add *
  *  routes *
    *    here */
//app.use('/', UserRoutes);

app.use('/api/v1/reviewer', ReviewerRoutes);
app.use('/api/v1/editor', EditorRoutes);
app.use('/api/v1/admin', AdminRoutes);
app.use('/api/v1/users/', UserRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });
}

mongoose
.connect(connectionString)
.then(() => {
  app.listen(port, () => {
    console.log('Server is listening on port ' + port + `\n http://localhost:${port}`);
});
})
.catch(err => {
    console.log(err);
});