'use strict';
const {
  Model
} = require('sequelize');

const roleHelper = require('../helpers/role');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ExpenseReport, {
        foreignKey: 'userId',
      })

      this.hasMany(models.ExpenseReportStatusChange, {
        foreignKey: 'changedByUserId',
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [roleHelper.VALID_ROLES],
          msg: `Role must be one of: ${roleHelper.VALID_ROLES.join(', ')}`,
        },
      },
      defaultValue: roleHelper.USER,
    },
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};