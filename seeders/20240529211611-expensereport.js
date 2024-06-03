'use strict';

const { ExpenseReport } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // bulk insert an expense report
    await ExpenseReport.bulkCreate([{
      description: 'Travel to client site',
      status: 'SUBMITTED',
      statusUpdatedAt: new Date(),
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }],
    {
      individualHooks: true
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ExpenseReports', null, {});
  }
};
