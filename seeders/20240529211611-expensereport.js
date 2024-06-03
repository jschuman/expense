'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // bulk insert an expense report
    await queryInterface.bulkInsert('ExpenseReports', [{
      description: 'Travel to client site',
      status: 'SUBMITTED',
      statusUpdatedAt: new Date(),
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ExpenseReports', null, {});
  }
};
