'use strict'
module.exports = (sequelize, DataTypes) => {
  const alerts = sequelize.define('alerts', {
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    desiredprice: DataTypes.STRING
  }, {})
  alerts.associate = function (models) {
    models.alerts.belongsTo(models.users, {
      as: 'users',
      foreignKey: 'id'
    })
  }
  return alerts
}
