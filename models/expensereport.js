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

  ExpenseReport.STATUS_SUBMITTED = 'SUBMITTED';
  ExpenseReport.STATUS_IN_PROGRESS = 'IN_PROGRESS';
  ExpenseReport.STATUS_REJECTED = 'REJECTED';
  ExpenseReport.STATUS_SCHEDULED_FOR_PAYMENT = 'SCHEDULED_FOR_PAYMENT';
  ExpenseReport.STATUS_PAID = 'PAID';

  ExpenseReport.VALID_STATUSES = [
    ExpenseReport.STATUS_SUBMITTED,
    ExpenseReport.STATUS_IN_PROGRESS,
    ExpenseReport.STATUS_REJECTED,
    ExpenseReport.STATUS_SCHEDULED_FOR_PAYMENT,
    ExpenseReport.STATUS_PAID,
  ];

  ExpenseReport.ALLOWED_STATUS_TRANSITIONS = {
    SUBMITTED: [ExpenseReport.STATUS_IN_PROGRESS, ExpenseReport.STATUS_REJECTED],
    IN_PROGRESS: [ExpenseReport.STATUS_SCHEDULED_FOR_PAYMENT, ExpenseReport.STATUS_REJECTED],
    SCHEDULED_FOR_PAYMENT: [ExpenseReport.STATUS_PAID],
    PAID: [],
    REJECTED: [ExpenseReport.STATUS_SUBMITTED],
  };

  ExpenseReport.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'SUBMITTED',
      validate: {
        isIn: {
          args: [ExpenseReport.VALID_STATUSES],
          msg: `Status must be one of: ${ExpenseReport.VALID_STATUSES.join(', ')}`,
        },
        isValidTransition(value) {
          if (this._previousDataValues.status) {
            const allowedTransitions = ExpenseReport.ALLOWED_STATUS_TRANSITIONS[this._previousDataValues.status];
            if (!allowedTransitions.includes(value)) {
              throw new Error(`Cannot transition from ${this._previousDataValues.status} to ${value}`);
            }
          }
        },
      }
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