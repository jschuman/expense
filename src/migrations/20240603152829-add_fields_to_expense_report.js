'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ExpenseReports', 'isReimbursableFromClient', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('ExpenseReports', 'clientName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('ExpenseReports', 'adminNotes', {
      type: Sequelize.STRING,
      allowNull: true,
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ExpenseReports', 'isReimbursableFromClient');
    await queryInterface.removeColumn('ExpenseReports', 'clientName');
    await queryInterface.removeColumn('ExpenseReports', 'adminNotes');
  }
};