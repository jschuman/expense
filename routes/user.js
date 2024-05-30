const express = require('express');
const router = express.Router();
const { User: UserModel } = require('../models');

// GET /users
router.get("/", (req, res) => {
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

// GET /users/:id
router.get("/:id", (req, res) => {
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

// POST /users
router.post("/", (req, res) => {
  
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

// PUT /users/:id
router.put("/:id", (req, res) => {
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

// DELETE /users/:id
router.delete("/:id", (req, res) => {
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

// Handle the GET request to fetch the expense reports of a user.
router.get("/:id/expenseReports", (req, res) => {
  UserModel.findByPk(req.params.id, {
      include: "ExpenseReports",
  })
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

module.exports = router;