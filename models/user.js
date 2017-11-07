'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: {
      type : DataTypes.STRING,
      unique : {
        args : true,
        msg : 'Username sudah terdaftar'
      }
    },
    password: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      unique : {
        args : true,
        msg : 'Email sudah terdaftar'
      },
      validate: {
        isEmail: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};