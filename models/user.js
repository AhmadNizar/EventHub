'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  })

  

  User.beforeCreate((user, options) => {
     return bcrypt.hash(user.password, saltRounds).then(function(hash) {
      user.password = hash
    })
  })

  User.associate = function(model) {
    User.hasMany (model.UserGroup)
    User.belongsToMany (model.Group, {through : 'UserGroup'})
  }

  return User;
};
