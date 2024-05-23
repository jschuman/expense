//imports
const Sequelize = require("sequelize");
const config = require("./config.json");

/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
const sequelize = new Sequelize( config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

/**
 * Export the Sequelize instance. This instance can now be 
 * used in the app.js file to authenticate and establish a database connection.
 */
module.exports = sequelize;