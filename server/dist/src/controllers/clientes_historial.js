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
exports.putClienteHistorial = exports.postClienteHistorial = exports.deleteClienteHistorial = exports.getClienteHistorial = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
const cliente_historial_1 = __importDefault(require("../models/cliente-historial"));
const metodos_pago_1 = __importDefault(require("../models/metodos-pago"));
const getClienteHistorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield cliente_1.default.findByPk(id, {
            include: [{
                    model: cliente_historial_1.default,
                    as: 'historial',
                    include: [{
                            model: metodos_pago_1.default,
                            as: 'metodoPago'
                        }]
                }]
        });
        if (cliente) {
            res.json({
                status: 'ok',
                msg: 'Get cliente exitoso',
                body: cliente
            });
        }
        else {
            res.status(404).json({
                status: 'error',
                msg: `No existe un cliente con el id ${id}`
            });
        }
    }
    catch (error) {
        console.error('ERROR al obtener cliente:', error);
        res.status(500).json({
            status: 'error',
            msg: `Ocurrió un error al obtener el cliente ${error}`
        });
    }
});
exports.getClienteHistorial = getClienteHistorial;
const deleteClienteHistorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield cliente_historial_1.default.findByPk(id);
        if (!cliente) {
            return res.status(404).json({
                status: 'error',
                msg: `No existe un cliente con el id ${id}`,
            });
        }
        yield cliente.destroy();
        res.json({
            status: 'ok',
            msg: 'El trabajo fue eliminado',
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            msg: `Ocurrió un error al eliminar el cliente: ${error}`,
        });
    }
});
exports.deleteClienteHistorial = deleteClienteHistorial;
const postClienteHistorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price, date, metodo_pago } = req.body;
    const metodoMap = {
        1: 'Credito',
        2: 'Debito',
        3: 'Efectivo',
        4: 'Transferencia'
    };
    try {
        const metodoTexto = metodoMap[metodo_pago];
        if (!metodoTexto) {
            return res.status(400).json({
                status: 'error'
            });
        }
        const cliente = yield cliente_1.default.findByPk(id);
        if (!cliente) {
            return res.status(404).json({
                msg: `No se encontró un cliente con el ID ${id}`,
            });
        }
        const historial = yield cliente_historial_1.default.create({
            cliente_id: id,
            name,
            description,
            price,
            date,
            metodo_pago: metodoTexto,
            metodo_pago_id: metodo_pago
        });
        return res.json({
            status: 'ok',
            msg: 'Historial agregado con éxito',
            historial,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            msg: `Ocurrió un error al agregar el historial: ${error}`,
        });
    }
});
exports.postClienteHistorial = postClienteHistorial;
const putClienteHistorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const metodoMap = {
        1: 'Credito',
        2: 'Debito',
        3: 'Efectivo',
        4: 'Transferencia'
    };
    if (body.metodo_pago && metodoMap[body.metodo_pago]) {
        body.metodo_pago = metodoMap[body.metodo_pago];
        body.metodo_pago_id = parseInt(Object.keys(metodoMap).find(key => metodoMap[parseInt(key)] === body.metodo_pago) || "0");
    }
    try {
        const cliente = yield cliente_historial_1.default.findByPk(id);
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
        res.json({
            status: 'error',
            msg: `Ocurrio un error`
        });
    }
});
exports.putClienteHistorial = putClienteHistorial;
