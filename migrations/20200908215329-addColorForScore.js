"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("games", {
      gameScoreColor: {
        type: Sequelize.STRING,
      },
      steamReviewsBool: {
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropColumn("games");
  },
};
