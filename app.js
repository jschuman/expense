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

/**
 * Handle the POST request to create a user.
 */
app.post("/users", (req, res) => {
  
  //Call the create function on the User model, and pass the data that you receive.
  UserModel.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
  })
  .then((result) => {
      return res.json({
          message: "Record created successfully!",
      });
  })
  .catch((error) => {
      console.log(error);
      return res.json({
          message: "Unable to create a record!",
      });
  });
});

// Handle the GET request to fetch all users.
app.get("/users", (req, res) => {
  UserModel.findAll()
  .then((users) => {
      return res.json(users);
  })
  .catch((error) => {
      console.log(error);
      return res.json({
          message: "Unable to fetch records!",
      });
  });
});

// Handle the GET request to fetch a single user.
app.get("/users/:id", (req, res) => {
  UserModel.findByPk(req.params.id)
  .then((user) => {
      return res.json(user);
  })
  .catch((error) => {
      console.log(error);
      return res.json({
          message: "Unable to fetch the record!",
      });
  });
});

// Handle the DELETE request to delete a user.
app.delete("/users/:id", (req, res) => {
  UserModel.destroy({
      where: {
          id: req.params.id,
      },
  })
  .then((result) => {
      return res.json({
          message: "Record deleted successfully!",
      });
  })
});

//Handle the PUT request to update a user.
app.put("/users/:id", (req, res) => {
  UserModel.update
  (
      {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
      },
      {
          where: {
              id: req.params.id,
          },
      }
  ) 
  .then((result) => {
      return res.json({
          message: "Record updated successfully!",
      });
  }) 
});

