"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'Thobokholt123';
const validarJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ msg: 'Token no proporcionado' });
        return; // importante para evitar seguir ejecutando
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.usuario = decoded;
        next(); // pasa al siguiente middleware
    }
    catch (err) {
        res.status(401).json({ msg: 'Token inválido' });
    }
};
exports.validarJWT = validarJWT;
