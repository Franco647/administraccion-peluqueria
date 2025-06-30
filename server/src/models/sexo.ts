// models/sexo.ts
import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Sexo = db.define('sexos', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  descripcion: { type: DataTypes.STRING, allowNull: false }
}, {
  timestamps: false,
  freezeTableName: true
});

export default Sexo;
