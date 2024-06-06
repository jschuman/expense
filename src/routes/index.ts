// Initialize all routes in the routes folder
import fs from "fs";
import path from 'path';
import { pluralize } from 'inflection';
import express, { Router } from 'express';

const basename: string = path.basename(__filename);

const router: Router = express.Router();

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file: string) => {
    const routes = require(path.join(__dirname, file))
    let routeName: string = file.split('.')[0];

    if (routeName.endsWith('model')) {
      routeName = pluralize(routeName.substring(0, routeName.length - 5));
    }
    router.use(`/${routeName}`, routes);
  });

module.exports = router;

