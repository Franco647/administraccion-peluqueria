"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const cliente_historial_1 = __importDefault(require("./cliente-historial"));
class Cliente extends sequelize_1.Model {
}
Cliente.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    fecha_nacimiento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize: connection_1.default,
    tableName: 'clientes',
    createdAt: false,
    updatedAt: false
});
Cliente.hasMany(cliente_historial_1.default, {
    foreignKey: 'cliente_id',
    as: 'historial'
});
exports.default = Cliente;
