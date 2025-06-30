import { DataTypes } from 'sequelize';
import db from '../db/connection';
import MetodoPago from './metodos-pago'; 


const ClienteHistorial = db.define('Clientes_historial', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DOUBLE
  },
  date: {
    type: DataTypes.DATE
  },
  metodo_pago: {
    type: DataTypes.STRING,
  },
  metodo_pago_id: {
    type: DataTypes.INTEGER,
  }
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

ClienteHistorial.belongsTo(MetodoPago, {
  foreignKey: 'metodo_pago_id',
  as: 'metodoPago'
});

export default ClienteHistorial;
