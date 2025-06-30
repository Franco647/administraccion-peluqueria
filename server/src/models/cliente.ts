import { DataTypes, Model, Optional } from 'sequelize'
import db from '../db/connection'
import ClienteHistorial from './cliente-historial';

interface ClienteAttributes {
    id: number;
    name: string;
    sexo: string;
    fecha_nacimiento: Date;
}

interface ClienteCreationAttributes extends Optional<ClienteAttributes, 'id'> {}

class Cliente extends Model<ClienteAttributes, ClienteCreationAttributes> implements ClienteAttributes {
    public id!: number;
    public name!: string;
    public fecha_nacimiento!: Date;
    public sexo!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Cliente.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sexo: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        sequelize: db,
        tableName: 'clientes',
        createdAt: false,
        updatedAt: false
    }
);

Cliente.hasMany(ClienteHistorial, {
    foreignKey: 'cliente_id',
    as: 'historial'
});

export default Cliente;