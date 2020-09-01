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
      metacriticLink: {
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
      salePrice: {
        type: Sequelize.FLOAT
      },
      normalPrice: {
        type: Sequelize.FLOAT
      },
      isOnSale: {
        type: Sequelize.BOOLEAN
      },
      savings: {
        type: Sequelize.FLOAT
      },
      metacriticScore: {
        type: Sequelize.INTEGER
      },
      steamRatingText: {
        type: Sequelize.STRING
      },
      steamRatingPercent: {
        type: Sequelize.INTEGER
      },
      steamRatingCount: {
        type: Sequelize.INTEGER
      },
      steamAppID: {
        type: Sequelize.INTEGER
      },
      releaseDate: {
        type: Sequelize.INTEGER
      },
      lastChange: {
        type: Sequelize.INTEGER
      },
      dealRating: {
        type: Sequelize.FLOAT
      },
      thumb: {
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