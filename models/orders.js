'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user',
      })
      this.hasMany(models.Orderdetails, {
        foreignKey: 'order_id',
        as: 'orderdetails',
      })
    }
  }
  Orders.init({
    user_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
    tableName: 'orders',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    updatedBy: 'updated_by',
  });
  return Orders;
};