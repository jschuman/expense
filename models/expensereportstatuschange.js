'use strict';
const {
  Model
} = require('sequelize');

const statusHelper = require('../helpers/status');

module.exports = (sequelize, DataTypes) => {
  class ExpenseReportStatusChange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ExpenseReport, {
        foreignKey: 'expenseReportId',
        onDelete: 'CASCADE'
      })

      this.belongsTo(models.User, {
        foreignKey: 'changedByUserId',
        onDelete: 'CASCADE'
      })
    }
  }
  ExpenseReportStatusChange.init({
    expenseReportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    changedByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [statusHelper.VALID_STATUSES],
          msg: `Status must be one of: ${statusHelper.VALID_STATUSES.join(', ')}`,
        },
      }
    },
  }, {
    sequelize,
    modelName: 'ExpenseReportStatusChange',
  });
  return ExpenseReportStatusChange;
};