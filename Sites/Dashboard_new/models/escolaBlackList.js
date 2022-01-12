'use strict';

module.exports = (sequelize, DataTypes) => {
    let escolaBlackList = sequelize.define('escolaBlackList', {
        idEscBlack: {
            field: 'idEscBlack',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fkEscola: {
            field: 'fkEscola',
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
            tableName: 'Escola_has_Blacklist',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return escolaBlackList;
};
