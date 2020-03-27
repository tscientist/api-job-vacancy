'use strict';
module.exports = (sequelize, DataTypes) => {
    const Candidature = sequelize.define('Candidature', {
        adminId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {});
    Candidature.associate = function (models) {
        Candidature.belongsTo(models.Job, {
            foreignKey: 'jobId',
            allowNull: false,
            onDelete: 'CASCADE',
            as: 'jobs',
        });
        Candidature.hasMany(models.Comment, {
            foreignKey: 'candidatureId',
            allowNull: false,
            as: 'candidatures',
        });
    };
    return Candidature;
};