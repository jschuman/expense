'use strict';
const {
  Model
} = require('sequelize');

const statusHelper = require('../helpers/status');

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

      this.hasMany(models.ExpenseReportStatusChange, {
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
      defaultValue: 'SUBMITTED',
      validate: {
        isIn: {
          args: [statusHelper.VALID_STATUSES],
          msg: `Status must be one of: ${statusHelper.VALID_STATUSES.join(', ')}`,
        },
        isValidTransition(value) {
          if (this._previousDataValues.status) {
            const allowedTransitions = statusHelper.ALLOWED_STATUS_TRANSITIONS[this._previousDataValues.status];
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
    isReimbursableFromClient: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isClientNameRequired(value) {
          if (this.isReimbursableFromClient && !value) {
            throw new Error('clientName is required when isReimbursableFromClient is true');
          }
        },
      },
    },
    adminNotes: {
      type: DataTypes.STRING,
      allowNull: true,
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
      afterCreate: async (expenseReport, options) => {
        await sequelize.models.ExpenseReportStatusChange.create({
          expenseReportId: expenseReport.id,
          status: expenseReport.status,
          changedByUserId: expenseReport.userId,
        });
      },
      afterUpdate: async (expenseReport, options) => {
        if (expenseReport.status && expenseReport.status !== expenseReport._previousDataValues.status) {
          await sequelize.models.ExpenseReportStatusChange.create({
            expenseReportId: expenseReport.id,
            status: expenseReport.status,
            changedByUserId: expenseReport.userId,
          });
        }
      }
    },
  });
  return ExpenseReport;
};