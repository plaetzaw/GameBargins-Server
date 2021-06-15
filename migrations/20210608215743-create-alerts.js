'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('alerts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      userID: {
        type: Sequelize.INTEGER
      },
      gameID: {
        type: Sequelize.INTEGER
      },
      desiredprice: {
        type: Sequelize.FLOAT
      },
      setprice: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('alerts')
  }
}
