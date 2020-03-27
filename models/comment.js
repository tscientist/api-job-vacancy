'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        candidatureId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'Please enter your comment'
            }
        }
    },
}, {});
    Comment.associate = function (models) {
      Comment.belongsTo(models.Candidature, {
          foreignKey: 'candidatureId',
          allowNull: false,
          onDelete: 'CASCADE',
          as: 'candidatures',
        });
    };
    return Comment;
};