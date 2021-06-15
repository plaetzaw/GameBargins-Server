'use strict'
module.exports = (sequelize, DataTypes) => {
  const alerts = sequelize.define('alerts', {
    email: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    title: DataTypes.STRING,
    gameID: DataTypes.INTEGER,
    desiredprice: DataTypes.FLOAT,
    setprice: DataTypes.FLOAT
  }, {})
  alerts.associate = function (models) {
    models.alerts.belongsTo(models.users, {
      as: 'users',
      foreignKey: 'id'
    })
  }
  return alerts
}
