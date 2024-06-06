'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // bulk insert an expense report
    await queryInterface.bulkInsert('ExpenseReportItems', [
      {
        description: 'Stay at Motel 6',
        amount: 100.00,
        incurredAt: new Date(new Date().setDate(new Date().getDate() - 7)),
        expenseReportId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Meals',
        amount: 55,
        incurredAt: new Date(new Date().setDate(new Date().getDate() - 7)),
        expenseReportId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ExpenseReportItems', null, {});
  }
};
