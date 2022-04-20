const fp = require('fastify-plugin');
const pgp = require('pg-promise')();

const configuration = require('../config/configuration')

module.exports = fp(function (fastify, opts, done) {
    fastify.log.info(configuration.databaseUri);
    
    const db = pgp(configuration.databaseUri);
    fastify.decorate('db', db);
    done()
})