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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const connection_1 = __importDefault(require("../db/connection"));
const crearUsuario = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.sync(); // conecta y sincroniza modelos
    const email = 'francothobokholt@gmail.com';
    const passwordPlano = 'admin@admin';
    const passwordHash = bcryptjs_1.default.hashSync(passwordPlano, 10);
    yield Usuario_1.default.create({
        email,
        password: passwordHash,
        nombre: 'Administrador',
        rol: 'usuario',
        activo: true
    });
    console.log('✅ Usuario creado con hash');
});
crearUsuario();
