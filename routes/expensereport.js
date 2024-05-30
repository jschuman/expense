const express = require('express');
const router = express.Router();
const { ExpenseReport: ExpenseReportModel } = require('../models');

// Get all expense reports
router.get('/', async (req, res) => {
  try {
    const expenseReports = await ExpenseReportModel.findAll();
    res.json(expenseReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific expense report
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const expenseReport = await ExpenseReport.findByPk(id);
    if (!expenseReport) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    res.json(expenseReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new expense report
router.post('/', async (req, res) => {
  const { title, amount } = req.body;
  try {
    const expenseReport = await ExpenseReport.create({ title, amount });
    res.status(201).json(expenseReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update an expense report
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  try {
    const expenseReport = await ExpenseReport.findByPk(id);
    if (!expenseReport) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    expenseReport.title = title;
    expenseReport.amount = amount;
    await expenseReport.save();
    res.json(expenseReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete an expense report
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const expenseReport = await ExpenseReport.findByPk(id);
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

module.exports = router;