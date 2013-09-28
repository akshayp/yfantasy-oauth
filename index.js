'use strict';

var everyauth = require('everyauth'),
    express = require('express'),
    exphbs  = require('express3-handlebars'),
    app = express(),
    config = require('./conf/config.js'),
    users = require('./lib/users.js'),
    hbs = exphbs.create({ defaultLayout: 'main' });


//Configure Everyauth to plugin to express
everyauth.everymodule.findUserById(users.findUser);

everyauth.yahoo.consumerKey(config.consumer_key)
               .consumerSecret(config.consumer_secret)
               .findOrCreateUser(users.findOrCreateUser)
               .redirectPath('/');

app.use(express.bodyParser());
app.use(express.cookieParser('shazam'));
app.use(express.session());
app.use(everyauth.middleware());
app.use(app.router);
require('./conf/routes.js')(app);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.listen(3000);
console.log('Go to http://dev.yahoo.com:3000');