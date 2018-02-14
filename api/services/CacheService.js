var redis = require("redis"),
  client = redis.createClient();

const {promisify} = require('util');

module.exports = {

    async get(key) {
        const getAsync = promisify(client.get).bind(client);
        return getAsync(key);
    },

    async set(key, lifetime, value) {
        const setex = promisify(client.setex.bind(client));
        return setex(key, lifetime, value);
    },

}

