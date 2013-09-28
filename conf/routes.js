'use strict';

var request = require('request'),
    config = require('./config.js'),
    parser = require('../lib/fantasy.js');

module.exports = function (app) {

    app.get('/', function (req, res) {

        if (req.session && req.session.auth) {
            var API_AUTH = {
                consumer_key: config.consumer_key,
                consumer_secret: config.consumer_secret,
                token: req.session.auth.yahoo.accessToken,
                token_secret: req.session.auth.yahoo.accessTokenSecret
            },
            url = 'http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nfl,mlb,nhl,nba/teams?format=json';
        
            request.get({ url: url, oauth: API_AUTH }, function (error, response, body) {
                
                if (response.statusCode === 200) {
                    var data = JSON.parse(body),
                        teams = parser.getTeams(data);

                    res.render('index', { teams: teams });
                } else {
                    console.log('Error: ' + response.statusCode);
                }
            });
        } else {
            res.render('index');
        }
    });
};