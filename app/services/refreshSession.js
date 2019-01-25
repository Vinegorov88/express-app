let userIds = [];

module.exports.add = function(userId) {
    if (!userIds.includes(userId)) userIds.push(userId);
}

module.exports.has = function(userId) {
    return userIds.includes(userId);
}

module.exports.remove = function(userId) {
    userIds = userIds.filter(id => id != userId);
}