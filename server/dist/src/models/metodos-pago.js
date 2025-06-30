"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// modelo MetodoPago.ts (ejemplo)
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class MetodoPago extends sequelize_1.Model {
}
MetodoPago.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: connection_1.default,
    tableName: 'metodos_pago',
    timestamps: false
});
exports.default = MetodoPago;
