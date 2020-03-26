'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    position: {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },{});
  Job.associate = function(models) {
    Job.belongsTo(models.User,{
      foreignKey: 'userId',
      allowNull: false,
      onDelete: 'CASCADE',
      as: 'jobs',
  });
  };
  return Job;
};
