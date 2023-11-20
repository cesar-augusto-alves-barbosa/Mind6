'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
	let Tecnico = sequelize.define('Tecnico', {
		id: {
			field: 'idTecnico',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nomeTecnico: {
			field: 'nomeTecnico',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefoneTec: {
			field: 'telefoneTec',
			type: DataTypes.STRING,
			allowNull: false
		},
		emailTec: {
			field: 'emailTec',
			type: DataTypes.STRING,
			allowNull: false
		},
		senhaTec: {
			field: 'senhaTec',
			type: DataTypes.STRING,
			allowNull: false
		},
		disponibilidade: {
			field: 'disponibilidade',
			type: DataTypes.BOOLEAN
		},
		fkGestor: {
			field: 'fkGestor',
			type: DataTypes.INTEGER
		},
		fkEscola: {
			field: 'fkEscola',
			type: DataTypes.INTEGER,
			allowNull: false
		},
	},
		{
			tableName: 'Tecnico',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		});
	Tecnico.belongsTo(Tecnico, {
		foreignKey: 'fkGestor'
	})
	return Tecnico;
};
