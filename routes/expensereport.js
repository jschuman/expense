const express = require('express');
const router = express.Router();
const { ExpenseReport: ExpenseReportModel } = require('../models');

/**
 * @swagger
 * /expensereports:
 *   get:
 *     description: Get all expense reports
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server Error
 */
router.get('/', async (req, res) => {
  try {
    const expenseReports = await ExpenseReportModel.findAll();
    res.json(expenseReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @swagger
 * /expensereports/{id}:
 *   get:
 *     description: Get an expense report by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the expense report
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Expense report not found
 *       500:
 *         description: Server Error
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const expenseReport = await ExpenseReportModel.findByPk(id);
    if (!expenseReport) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    res.json(expenseReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @swagger
 * /expensereports:
 *   post:
 *     description: Create an expense report
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Server Error
 */
router.post('/', async (req, res) => {
  const { description, userId } = req.body;
  try {
    const expenseReport = await ExpenseReportModel.create({ description, userId });
    res.status(201).json(expenseReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @swagger
 * /expensereports/{id}:
 *   put:
 *     description: Update an expense report
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the expense report
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Expense report not found
 *       500:
 *         description: Server Error
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;
  try {
    const expenseReport = await ExpenseReportModel.findByPk(id);
    if (!expenseReport) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    expenseReport.description = description;
    expenseReport.status = status;
    
    await expenseReport.save();
    res.json(expenseReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// add swagger docs
/**
 * @swagger
 * /expensereports/{id}:
 *   delete:
 *     description: Delete an expense report
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the expense report
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense report deleted successfully
 *       404:
 *         description: Expense report not found
 *       500:
 *         description: Server Error
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const expenseReport = await ExpenseReportModel.findByPk(id);
    if (!expenseReport) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    await expenseReport.destroy();
    res.json({ message: 'Expense report deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @swagger
 * /expensereports/{id}/expenseReportItems:
 *   get:
 *     description: Get expense report items by expense report id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the expense report
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server Error
 */
router.get("/:id/expenseReportItems", (req, res) => {
  ExpenseReportModel.findByPk(req.params.id, {
      include: "ExpenseReportItems",
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