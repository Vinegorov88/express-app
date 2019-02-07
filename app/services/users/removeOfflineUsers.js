let lastUsersOnline = require('./lastUsersOnline');
let moment = require('moment');

function execute() {
    for (let userId in lastUsersOnline) {
        if (lastUsersOnline[userId] < moment().unix() - 1 * 60) {
            delete(lastUsersOnline[userId]);
        }
        console.log(lastUsersOnline);
    }
}

setInterval(execute, 10000);