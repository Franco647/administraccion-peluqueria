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
exports.putCliente = exports.postCliente = exports.deleteCliente = exports.getClientes = exports.getMetodosDePago = exports.getSexos = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
const getSexos = (req, res) => {
    const sexos = [
        { id: 1, descripcion: 'Masculino' },
        { id: 2, descripcion: 'Femenino' },
        { id: 3, descripcion: 'No definido' }
    ];
    res.json({
        status: 'ok',
        sexos
    });
};
exports.getSexos = getSexos;
const getMetodosDePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const metodos = [
        { id: 1, descripcion: 'Credito' },
        { id: 2, descripcion: 'Debito' },
        { id: 3, descripcion: 'Efectivo' },
        { id: 4, descripcion: 'Transferencia' }
    ];
    res.json({
        status: 'ok',
        metodos
    });
});
exports.getMetodosDePago = getMetodosDePago;
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCliente = yield cliente_1.default.findAll();
    try {
        res.json({
            status: 'ok',
            msg: 'get de clientes',
            body: listCliente
        });
    }
    catch (error) {
        res.json({
            status: `error`,
            msg: `Ocurrió un error al cargar los clientes ${error}`
        });
    }
});
exports.getClientes = getClientes;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield cliente_1.default.findByPk(id);
        if (!cliente) {
            return res.status(404).json({
                status: 'error',
                msg: `No existe un cliente con el id ${id}`,
            });
        }
        yield cliente.destroy();
        return res.json({
            status: 'ok',
            msg: 'El cliente y su historial fueron eliminados',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: `Ocurrió un error al eliminar el cliente: ${error}`,
        });
    }
});
exports.deleteCliente = deleteCliente;
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const sexoMap = {
        1: 'Masculino',
        2: 'Femenino',
        3: 'No definido'
    };
    try {
        const sexoTexto = sexoMap[body.sexo];
        if (!sexoTexto) {
            return res.status(400).json({
                status: 'error',
                msg: 'El valor de sexo debe ser 1 (masculino), 2 (femenino) o 3 (no definido)'
            });
        }
        const cliente = yield cliente_1.default.create(Object.assign(Object.assign({}, body), { sexo: sexoTexto }));
        res.json({
            status: 'ok',
            msg: 'El cliente fue agregado con éxito',
            body: cliente
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            msg: `Ocurrió un error: ${error}`
        });
    }
});
exports.postCliente = postCliente;
const putCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const cliente = yield cliente_1.default.findByPk(id);
        if (cliente) {
            yield cliente.update(body);
            res.json({
                status: 'ok',
                msg: `El cliente ${id} fue editado correctamente`
            });
        }
        else {
            res.status(404).json({
                status: 'ok',
                msg: `No existe un cliente con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            status: 'error',
            msg: `Ocurrio un error`
        });
    }
});
exports.putCliente = putCliente;
