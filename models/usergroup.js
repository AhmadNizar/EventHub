'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserGroup = sequelize.define('UserGroup', {
    UserId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserGroup;
};