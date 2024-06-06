const express = require('express');
const router = express.Router();
const { User: UserModel } = require('../models');
const { ensureAuthenticated } = require('../helpers/auth');

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     security:
 *       - OAuth2: ['openid', 'profile', 'email']
 *     responses:
 *       200:
 *         description: Success
 * 
 */
router.get("/", ensureAuthenticated, (req, res) => {
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

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User id
 *     responses:
 *       200:
 *         description: Success
 * 
 */
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

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 * 
 */
router.post("/", (req, res) => {
  
  //Call the create function on the User model, and pass the data that you receive.
  UserModel.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
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

/** 
 * @swagger
 * /users/{id}:
 *  put:
 *    description: Update user by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: id of the user
 *        schema:
 *          type: integer
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               role:
 *                 type: string
 *    responses:
 *      200:
 *        description: Success
 *      404: 
 *        description: user not found
 *      500:
 *        description: Server Error
 */ 
 router.put("/:id", (req, res) => {
  UserModel.update
  (
      {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          role: req.body.role,
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
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  })
});

/** 
 * @swagger
 * /users/{id}:
 *  delete:
 *    description: Delete user by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          description: User id
 *    responses:
 *      200:
 *        description: Success
 *  
 */
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
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  })
});

/** 
 * @swagger
 * /users/{id}/expenseReports:
 *  get:
 *    description: Get User with expense reports by user id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          description: User id
 *    responses:
 *      200:
 *        description: Success
 *  
 */
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

/** 
 * @swagger
 * /users/{id}:
 *  patch:
 *    description: Update user by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: id of the user
 *        schema:
 *          type: integer
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               role:
 *                 type: string
 *    responses:
 *      200:
 *        description: Success
 *      404: 
 *        description: user not found
 *      500:
 *        description: Server Error
 */
router.patch("/:id", (req, res) => {
  UserModel.update
  (
      {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          role: req.body.role,
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
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  })
});    

module.exports = router;