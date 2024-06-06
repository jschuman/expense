import express, { Router, Request, Response } from 'express';

const { ExpenseReport: ExpenseReportModel } = require('../models');
const router: Router = express.Router();

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
router.get('/', async (req: Request, res: Response) => {
  try {
    const expenseReports: any[] = await ExpenseReportModel.findAll();
    res.json(expenseReports);
  } catch (error: any) {
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
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expenseReport: any = await ExpenseReportModel.findByPk(id);
    if (!expenseReport) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    res.json(expenseReport);
  } catch (error: any) {
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
 *               isReimbursableFromClient:
 *                 type: boolean
 *               clientName:
 *                 type: string
 *               adminNotes:
 *                 type: string 
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Server Error
 */
router.post('/', async (req: Request, res: Response) => {
  const { description, userId, isReimbursableFromClient, clientName, adminNotes } = req.body;
  try {
    const expenseReport: any = await ExpenseReportModel.create({ description, userId, isReimbursableFromClient, clientName, adminNotes });
    res.status(201).json(expenseReport);
  } catch (error: any) {
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
 *               isReimbursableFromClient:
 *                 type: boolean
 *               clientName:
 *                 type: string
 *               adminNotes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Expense report not found
 *       500:
 *         description: Server Error
 */
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, status, isReimbursableFromClient, clientName, adminNotes } = req.body;
  try {
    const expenseReport: any = await ExpenseReportModel.findByPk(id);
    if (!expenseReport) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    expenseReport.description = description;
    expenseReport.status = status;
    expenseReport.isReimbursableFromClient = isReimbursableFromClient;
    expenseReport.clientName = clientName;
    expenseReport.adminNotes = adminNotes;
    
    await expenseReport.save();
    res.json(expenseReport);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

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
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expenseReport: any = await ExpenseReportModel.findByPk(id);
    if (!expenseReport) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    await expenseReport.destroy();
    res.json({ message: 'Expense report deleted successfully' });
  } catch (error: any) {
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
router.get("/:id/expenseReportItems", (req: Request, res: Response) => {
  ExpenseReportModel.findByPk(req.params.id, {
      include: "ExpenseReportItems",
  })
  .then((expenseReport: any) => {
      return res.json(expenseReport);
  })
  .catch((error: any) => {
      console.log(error);
      return res.json({
          message: "Unable to fetch the record!",
      });
  });
});

/**
 * @swagger
 * /expensereports/{id}:
 *   patch:
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
 *               status:
 *                 type: string
 *                 enum: [SUBMITTED, IN_PROGRESS, REJECTED, SCHEDULED_FOR_PAYMENT, PAID]
 *               isReimbursableFromClient:
 *                 type: boolean
 *               clientName:
 *                 type: string
 *               adminNotes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Expense report not found
 *       500:
 *         description: Server Error
 */
router.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, isReimbursableFromClient, clientName, adminNotes } = req.body;
  try {
    const expenseReport: any = await ExpenseReportModel.findByPk(id);
    if (!expenseReport) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    if (status) {
      expenseReport.status = status;
    }
    if (isReimbursableFromClient) {
      expenseReport.isReimbursableFromClient = isReimbursableFromClient;
    }
    if (clientName) {
      expenseReport.clientName = clientName;
    }
    if (adminNotes) {
      expenseReport.adminNotes = adminNotes;
    }

    await expenseReport.save();
    res.json(expenseReport);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;