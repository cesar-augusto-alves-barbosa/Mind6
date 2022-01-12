'use strict';

module.exports = (sequelize, DataTypes) => {
    let computadorBlackList = sequelize.define('computadorBlackList', {
        idCompBlack: {
            field: 'idCompBlack',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fkComputador: {
            field: 'fkComputador',
            type: DataTypes.STRING,
            allowNull: false
        },
        fkBlacklist: {
            field: 'fkBlacklist',
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            tableName: 'Computador_has_Blacklist',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return computadorBlackList;
};
