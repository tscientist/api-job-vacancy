'use strict';
var bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your name'
          }
        }
      },
    email: {
     type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
    },
    password: {
      type: DataTypes.STRING,
          allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
          allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
          allowNull: false,
    },
    isAdmin: {
      type: DataTypes.INTEGER,
          allowNull: false,
    }
  }, {});
  User.associate = function(models) {
      User.hasMany(models.Job,{
          foreignKey: 'userId',
          as: 'jobs',
      });
  };

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
  return User;
};
