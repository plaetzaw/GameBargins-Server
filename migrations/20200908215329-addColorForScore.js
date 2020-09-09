"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("games", "scoreColor", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("games", "steamCheckerBool", {
        type: Sequelize.BOOLEAN,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("games", "scoreColor"),
      queryInterface.removeColumn("games", "steamCheckerBool"),
    ]);
  },
};
