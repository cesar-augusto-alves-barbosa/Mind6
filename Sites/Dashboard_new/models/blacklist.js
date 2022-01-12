'use strict';

module.exports = (sequelize, DataTypes) => {
    let BlackList = sequelize.define('BlackList', {
        idBlacklist: {
            field: 'idBlacklist',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomeProcesso: {
            field: 'nomeProcesso',
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            tableName: 'Blacklist',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return BlackList;
};
