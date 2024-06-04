// Initialize all routes in the routes folder
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const express = require('express');
const inflection = require('inflection');

const router = express.Router();

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const routes = require(path.join(__dirname, file))
    let routeName = file.split('.')[0];

    if (routeName.endsWith('model')) {
      routeName = inflection.pluralize(routeName.substring(0, routeName.length - 5));
    }
    router.use(`/${routeName}`, routes);
  });

module.exports = router;

