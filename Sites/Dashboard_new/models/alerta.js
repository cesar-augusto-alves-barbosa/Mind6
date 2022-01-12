'use strict';

module.exports = (sequelize, DataTypes) => {
    let Computador = sequelize.define('Computador', {
        idComputador: {
            field: 'idComputador',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomeComputador: {
            field: 'nomeComputador',
            type: DataTypes.STRING,
            allowNull: false
        },
        fkEscola: {
            field: 'fkEscola',
            type: DataTypes.INTEGER,
            allowNull: false
        },

        sistemaOperacional: {
            field: 'sistemaOperacional',
            type: DataTypes.STRING,
            allowNull: false
        },

        disponibilidade: {
            field: 'disponibilidade',
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

        serialNum: {
            field: 'serialNum',
            type: DataTypes.STRING,
            allowNull: false
        },
        ipv4: {
            field: 'ipv4',
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            tableName: 'computador',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    let Alerta = sequelize.define('Alerta', {
        idAlerta: {
            field: 'idAlerta',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tituloAlerta: {
            field: 'tituloAlerta',
            type: DataTypes.STRING,
            allowNull: false
        },
        tipoAlerta: {
            field: 'tipoAlerta',
            type: DataTypes.STRING,
            allowNull: false
        },
        descricaoAlerta: {
            field: 'descricaoAlerta',
            type: DataTypes.STRING,
            allowNull: false
        },
        fkComputador: {
            field: 'fkComputador',
            type: DataTypes.STRING,
            allowNull: false
        },
        dataHora: {
            field: 'dataHora',
            type: DataTypes.DATE,
            allowNull: false
        },
    },
        {
            tableName: 'Alerta',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });
    Alerta.belongsTo(Computador, {
        foreignKey: 'fkComputador'
    })
    return Alerta;
};