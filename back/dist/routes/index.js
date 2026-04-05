"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_routes_1 = __importDefault(require("./Users.routes"));
const Appointments_routes_1 = __importDefault(require("./Appointments.routes"));
const router = (0, express_1.Router)();
router.use("/users", Users_routes_1.default);
router.use("/appointments", Appointments_routes_1.default);
exports.default = router;
