const { createClient } = require("redis")
require('dotenv').config();

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST,
        port: 13769
    }
});

module.exports = redisClient;