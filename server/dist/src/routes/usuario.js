"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
// login
router.post('/login', usuario_1.login);
router.post('/logout', usuario_1.logout);
router.get('/protected', validar_jwt_1.validarJWT, (req, res) => {
    res.json({ msg: 'Ruta protegida accedida con éxito' });
});
exports.default = router;
