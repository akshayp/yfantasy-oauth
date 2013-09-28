'use strict';

module.exports = {

    /*
     * @description Finds the user teams from the API call
     * @method getTeams
     * return Array
     */
    getTeams: function (data) {
        var games = data.fantasy_content.users['0'].user[1].games,
                parsedGames = [],
                parsedTeams = [],
                game;

        for (game in games) {
            if (typeof games[game] === "object") {
                parsedGames.push(games[game]);
            }
        }

        parsedGames.forEach(function (game) {
            var teams, teamid;
            for (teams in game.game[1]) {
                teams = game.game[1][teams];
                for (teamid in teams) {
                    if (teams[teamid].team && teams[teamid].team[0] && typeof teams[teamid].team[0] === "object") {
                        parsedTeams.push(teams[teamid].team[0]);
                    }
                }
            }
        });

        parsedTeams = parsedTeams.map(function (item) {
            var result = {};

            item.forEach(function (value) {
                var key;
                for (key in value) {
                    if (typeof value[key] === "object") {
                        result[key] = value[key][0];
                    } else {
                        result[key] = value[key];
                    }
                }
            });

            return result;
        });

        return parsedTeams;
    }
};