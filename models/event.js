'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    GroupId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    name_of_event : DataTypes.STRING,
    votes : DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Event.associate = function(model){
    Event.belongsTo(model.Group)
  }
  return Event;
};
