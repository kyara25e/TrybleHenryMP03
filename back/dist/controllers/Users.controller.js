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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginController = exports.userRegisterController = exports.getUserByIdController = exports.getUsersController = void 0;
const User_service_1 = require("../services/User.service");
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, User_service_1.getUserService)();
        res.status(200).json({
            data: users,
            msg: "Obtener el listado de todos los usuarios"
        });
    }
    catch (error) {
        res.status(400).json({
            msg: error instanceof Error ? error.message : "Ocurrio un error al obtener todos los usuarios"
        });
    }
});
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, User_service_1.getUserByIdService)(+req.params.id);
        res.status(200).json({
            user
        });
    }
    catch (error) {
        res.status(400).json({
            msg: error instanceof Error ? error.message : "Ocurrio un error al btener el usuarios"
        });
    }
});
exports.getUserByIdController = getUserByIdController;
const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRegister = yield (0, User_service_1.registerUserService)(req.body);
        res.status(201).json({
            data: userRegister,
            msg: "Registro de un nuevo usuario"
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            msg: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.userRegisterController = userRegisterController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            login: true,
            user: yield (0, User_service_1.loginUserService)(req.body),
        });
    }
    catch (error) {
        res.status(400).json({
            msg: error instanceof Error ? error.message : "Ocurrio un error al ibtener todos los usuarios"
        });
    }
});
exports.userLoginController = userLoginController;
