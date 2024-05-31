'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  }
  ExpenseReport.init({
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    statusUpdatedAt: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExpenseReport',
    hooks: {
      beforeCreate: (expenseReport, options) => {
        expenseReport.status = 'PENDING';
        expenseReport.statusUpdatedAt = new Date();
      },
      beforeUpdate: (expenseReport, options) => {
        if (expenseReport.status && expenseReport.status !== expenseReport._previousDataValues.status) {
          expenseReport.statusUpdatedAt = new Date();
        }
      },
    },
  });
  return ExpenseReport;
};