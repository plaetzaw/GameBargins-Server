'use strict'
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      moneysaved: DataTypes.INTEGER
    },
    {}
  )
  users.associate = function (models) {
    models.users.hasMany(models.games, {
      as: 'users',
      foreignKey: 'id'
    })
  }
  return users
}
