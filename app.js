// Set up Express server
const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

const db = require("./models");
const sequelize = db.sequelize;
const UserModel = db.User;

const initApp = async () => {
  console.log("Testing the database connection..");
  
  /**
   * Test the connection.
   * You can use the .authenticate() function to test if the connection works.
   */
  try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      
      //Start the web server on the specified port.
      app.listen(port, () => {
          console.log(`Server is up and running at: http://localhost:${port}`);
      });
  } catch (error) {
      console.error("Unable to connect to the database:", error.original);
  }
};  

initApp();

// import routes
const routes = require("./routes");
app.use('/', routes);

// import swagger
const swagger = require('./swagger');
swagger(app);