"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || 'Thobokholt123'; // ⚠️ Mejor usar dotenv
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({ where: { email } });
        if (!usuario) {
            res.status(404).json({ msg: 'Usuario no encontrado' });
            return;
        }
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.getDataValue('password'));
        if (!validPassword) {
            res.status(400).json({ msg: 'Contraseña incorrecta' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.getDataValue('id') }, SECRET_KEY, {
            expiresIn: '2h',
        });
        res.json({
            status: 'ok',
            msg: 'Login exitoso',
            token,
        });
    }
    catch (err) {
        res.status(500).json({ msg: 'Error en el login', error: err });
    }
});
exports.login = login;
const logout = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // JWT es stateless, así que el logout lo maneja el cliente borrando el token
    res.json({
        status: 'ok',
        msg: 'Logout exitoso'
    });
});
exports.logout = logout;
