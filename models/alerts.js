'use strict'
module.exports = (sequelize, DataTypes) => {
  const alerts = sequelize.define('alerts', {
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    gameID: DataTypes.INTEGER,
    desiredprice: DataTypes.INTEGER,
    setprice: DataTypes.INTEGER
  }, {})
  alerts.associate = function (models) {
    models.alerts.belongsTo(models.users, {
      as: 'users',
      foreignKey: 'id'
    })
  }
  return alerts
}
