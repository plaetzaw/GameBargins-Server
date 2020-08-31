"use strict";
module.exports = (sequelize, DataTypes) => {
  const games = sequelize.define(
    "games",
    {
      title: DataTypes.STRING,
      metacriticlink: DataTypes.STRING,
      dealID: DataTypes.STRING,
      storeID: DataTypes.INTEGER,
      gameID: DataTypes.INTEGER,
      saleprice: DataTypes.INTEGER,
      normalprice: DataTypes.INTEGER,
      isonsale: DataTypes.BOOLEAN,
      savings: DataTypes.INTEGER,
      metacriticscore: DataTypes.INTEGER,
      steamratingtext: DataTypes.STRING,
      steamratingpercent: DataTypes.INTEGER,
      streamratingcount: DataTypes.INTEGER,
      steamID: DataTypes.INTEGER,
      releasedate: DataTypes.INTEGER,
      lastchange: DataTypes.INTEGER,
      dealrating: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
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
