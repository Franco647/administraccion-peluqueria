"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/sexo.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Sexo = connection_1.default.define('sexos', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    descripcion: { type: sequelize_1.DataTypes.STRING, allowNull: false }
}, {
    timestamps: false,
    freezeTableName: true
});
exports.default = Sexo;
