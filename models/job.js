'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the job position'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the job description'
        }
      }
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },{});
  Job.associate = function(models) {
    Job.belongsTo(models.User,{
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Job;
};
