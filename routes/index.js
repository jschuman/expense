// const express = require('express');
// const router = express.Router();

// // import user routes and use
// const userRoutes = require("./user");
// router.use('/users', userRoutes);

// const expenseReportRoutes = require("./expensereport");
// router.use('/expensereports', expenseReportRoutes);

// module.exports = router;

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
    const routeName = inflection.pluralize(file.split('.')[0]);
    router.use(`/${routeName}`, routes);
  });

module.exports = router;

