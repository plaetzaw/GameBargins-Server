"use strict";
module.exports = (sequelize, DataTypes) => {
  const games = sequelize.define(
    "games",
    {
      title: DataTypes.STRING,
      metacriticLink: DataTypes.STRING,
      dealID: DataTypes.STRING,
      storeID: DataTypes.INTEGER,
      gameID: DataTypes.INTEGER,
      salePrice: DataTypes.FLOAT,
      normalPrice: DataTypes.FLOAT,
      isOnSale: DataTypes.BOOLEAN,
      savings: DataTypes.FLOAT,
      metacriticScore: DataTypes.INTEGER,
      steamRatingText: DataTypes.STRING,
      steamRatingPercent: DataTypes.INTEGER,
      steamRatingCount: DataTypes.INTEGER,
      steamAppID: DataTypes.INTEGER,
      releaseDate: DataTypes.INTEGER,
      lastChange: DataTypes.INTEGER,
      dealRating: DataTypes.FLOAT,
      thumb: DataTypes.STRING,
      userID: DataTypes.INTEGER,
      steamCheckerBool: DataTypes.BOOLEAN,
      scoreColor: DataTypes.STRING,
    },
    {}
  );
  games.associate = function (models) {
    models.games.belongsTo(models.users, {
      as: "users",
      foreignKey: "id",
    });
  };
  return games;
};
