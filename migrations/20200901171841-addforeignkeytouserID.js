"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("games", {
      fields: ["userID"],
      type: "FOREIGN KEY",
      name: "addforeignkeytouserID",
      references: {
        table: "users",
        field: "id",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("users", "addforeignkeytouserID");
  },
};
