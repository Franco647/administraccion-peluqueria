// modelo MetodoPago.ts (ejemplo)
import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

class MetodoPago extends Model {
  public id!: number;
  public descripcion!: string;
}

MetodoPago.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: 'metodos_pago',
    timestamps: false
  }
);

export default MetodoPago;
