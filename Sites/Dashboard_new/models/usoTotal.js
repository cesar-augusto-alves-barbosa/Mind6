'use strict';

module.exports = (sequelize, DataTypes) => {
    let usoTotal = sequelize.define('usoTotal', {
        idUsoAtual: {
            field: 'idUsoAtual',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UsoComponente: {
            field: 'UsoComponente',
            type: DataTypes.STRING,
            allowNull: false
        },
        dataHora: {
            field: 'dataHora',
            type: DataTypes.DATE,
            allowNull: false
        },
        fkComponente: {
            field: 'fkComponente',
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
        {
            tableName: 'usoTotal',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return usoTotal;
};
