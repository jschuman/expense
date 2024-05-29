'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // bulk insert an expense report
    await queryInterface.bulkInsert('ExpenseReports', [{
      description: 'Dinner with client',
      status: 'PENDING',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ExpenseReports', null, {});
  }
};
