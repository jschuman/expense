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

      this.hasMany(models.ExpenseReportItem, {
        foreignKey: 'expenseReportId',
      })
    }
  }
  ExpenseReport.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDING',
    },
    statusUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ExpenseReport',
    hooks: {
      beforeUpdate: (expenseReport, options) => {
        if (expenseReport.status && expenseReport.status !== expenseReport._previousDataValues.status) {
          expenseReport.statusUpdatedAt = new Date();
        }
      },
    },
  });
  return ExpenseReport;
};