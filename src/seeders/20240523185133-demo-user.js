'use strict';

const roleHelper = require('../helpers/role');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //bulk insert a single user
    await queryInterface.bulkInsert('Users', [{
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: roleHelper.ADMIN
    },
    {
      email: 'jdoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: roleHelper.USER
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
