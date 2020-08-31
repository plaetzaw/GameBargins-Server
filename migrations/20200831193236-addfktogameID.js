"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("games", {
      fields: ["gameID"],
      type: "FOREIGN KEY",
      name: "addfktogameID",
      references: {
        table: "users",
        field: "id",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("users", "addfktogameID");
  },
};
