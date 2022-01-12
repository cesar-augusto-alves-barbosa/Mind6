'use strict';

module.exports = (sequelize, DataTypes) => {
    let Componente = sequelize.define('Componente', {
        idComponente: {
            field: 'idComponente',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomeComponente: {
            field: 'nomeComponente',
            type: DataTypes.STRING,
            allowNull: false
        },
        tipoComponente: {
            field: 'tipoComponente',
            type: DataTypes.STRING,
            allowNull: false
        },
        fkComputador: {
            field: 'fkComputador',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        memoriaMax: {
            field: 'memoriaMax',
            type: DataTypes.DOUBLE,
            allowNull: false
        },
    },
        {
            tableName: 'Componente',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return Componente;
};
