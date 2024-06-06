'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseReportItem extends Model {
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
    }
  }
  ExpenseReportItem.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    incurredAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    expenseReportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ExpenseReportItem',
  });
  return ExpenseReportItem;
};