import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();
const { ExpenseReportItem: ExpenseReportItemModel } = require('../models');

/**
 * @swagger
 * /expensereportitems/{id}:
 *   get:
 *     description: Get an expense report item by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the expense report item
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Expense report item not found
 *       500:
 *         description: Server Error
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expenseReportItem: any = await ExpenseReportItemModel.findByPk(id);
    if (!expenseReportItem) {
      return res.status(404).json({ message: 'Expense report item not found' });
    }
    res.json(expenseReportItem);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @swagger
 * /expensereportitems:
 *   post:
 *     description: Create an expense report item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               incurredAt:
 *                 type: string
 *               amount:
 *                 type: number
 *               expenseReportId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Server Error
 */
router.post('/', async (req: Request, res: Response) => {
  const { description, incurredAt, amount, expenseReportId } = req.body;
  try {
    const expenseReportItem: any = await ExpenseReportItemModel.create(
      { description, 
        incurredAt,
        amount,
        expenseReportId });
    res.status(201).json(expenseReportItem);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @swagger
 * /expensereportitems/{id}:
 *   put:
 *     description: Update an expense report item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the expense report item
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
 *               incurredAt:
 *                 type: string
 *               amount:
 *                 type: number   
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Expense report item not found
 *       500:
 *         description: Server Error
 */
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, incurredAt, amount } = req.body;
  try {
    const expenseReportItem: any = await ExpenseReportItemModel.findByPk(id);
    if (!expenseReportItem) {
      return res.status(404).json({ message: 'Expense report Item not found' });
    }
    expenseReportItem.description = description;
    expenseReportItem.incurredAt = incurredAt;
    expenseReportItem.amount = amount;

    await expenseReportItem.save();
    res.json(expenseReportItem);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// add swagger docs
/**
 * @swagger
 * /expensereportitems/{id}:
 *   delete:
 *     description: Delete an expense report item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the expense report item
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense report item deleted successfully
 *       404:
 *         description: Expense report item not found
 *       500:
 *         description: Server Error
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expenseReportItem: any = await ExpenseReportItemModel.findByPk(id);
    if (!expenseReportItem) {
      return res.status(404).json({ message: 'Expense report item not found' });
    }
    await expenseReportItem.destroy();
    res.json({ message: 'Expense report item deleted successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;