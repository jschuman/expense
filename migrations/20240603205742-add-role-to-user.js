'use strict';

const roleHelper = require('../helpers/role');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'USER',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'role');
  }
};
