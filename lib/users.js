var usersByYahooId = {},
    usersById = {},
    nextUserId = 0;

/*
 * @description Adds a user to the current user stack
 * @method addUser
 * return user Object
 */
function addUser(source, sourceUser) {
    var user = usersById[++nextUserId] = { id: nextUserId };
    
    user[source] = sourceUser;
    
    return user;
}

module.exports = {

    /*
     * @description Finds the user in the current user stack
     * @method findUser
     * return null
     */
    findUser: function (id, callback) {
        callback(null, usersById[id]);
    },
    
    /*
     * @description Finds the user in the current user stack or adds one to it if there isn't already one
     * @method findOrCreateUser
     * return user Object
     */
    findOrCreateUser: function (session, accessToken, accessSecret, yahooUser) {
        return usersByYahooId[yahooUser.id] || (usersByYahooId[yahooUser.id] = addUser('yahoo', yahooUser));
    }
};