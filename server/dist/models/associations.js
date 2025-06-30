"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_1 = __importDefault(require("./cliente"));
const cliente_historial_1 = __importDefault(require("./cliente-historial"));
// Un cliente tiene muchos historiales
cliente_1.default.hasMany(cliente_historial_1.default, {
    foreignKey: 'cliente_id',
    as: 'historial',
    onDelete: 'CASCADE',
});
// Cada historial pertenece a un cliente
cliente_historial_1.default.belongsTo(cliente_1.default, {
    foreignKey: 'cliente_id',
    as: 'cliente',
    onDelete: 'CASCADE',
});
// LOGIN
// Usuario.hasMany(Usuario, {
//   foreignKey: 'usuario',
//   as: 'usuario',
//   onDelete: 'CASCADE',
// });
