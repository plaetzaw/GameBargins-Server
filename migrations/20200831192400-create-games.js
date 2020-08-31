'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      metacriticlink: {
        type: Sequelize.STRING
      },
      dealID: {
        type: Sequelize.STRING
      },
      storeID: {
        type: Sequelize.INTEGER
      },
      gameID: {
        type: Sequelize.INTEGER
      },
      saleprice: {
        type: Sequelize.INTEGER
      },
      normalprice: {
        type: Sequelize.INTEGER
      },
      isonsale: {
        type: Sequelize.BOOLEAN
      },
      savings: {
        type: Sequelize.INTEGER
      },
      metacriticscore: {
        type: Sequelize.INTEGER
      },
      steamratingtext: {
        type: Sequelize.STRING
      },
      steamratingpercent: {
        type: Sequelize.INTEGER
      },
      streamratingcount: {
        type: Sequelize.INTEGER
      },
      steamID: {
        type: Sequelize.INTEGER
      },
      releasedate: {
        type: Sequelize.INTEGER
      },
      lastchange: {
        type: Sequelize.INTEGER
      },
      dealrating: {
        type: Sequelize.INTEGER
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('games');
  }
};