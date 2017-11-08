'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    name_of_group: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });


  Group.associate = function(model) {
    Group.hasMany (model.UserGroup)
    Group.belongsToMany (model.User, {through : 'UserGroup'})
  }
  return Group;
};
