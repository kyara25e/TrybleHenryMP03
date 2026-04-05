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
exports.cancelAppointmentController = exports.scheduleAppointmentController = exports.getAppointmentByIdController = exports.getAppointmentsController = void 0;
const Appointment_Service_1 = require("../services/Appointment.Service");
const getAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            data: yield (0, Appointment_Service_1.getAppointmentService)(),
            msg: "Obtener el listado de todos los turnos de todos los usuarios."
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            data: yield (0, Appointment_Service_1.getAppointmentByIdService)(+req.params.id),
            msg: "Obtener el detalle de un turno específico."
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.getAppointmentByIdController = getAppointmentByIdController;
const scheduleAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(201).json({
            data: yield (0, Appointment_Service_1.registerAppointmentService)(req.body),
            msg: "Agendar un nuevo turno."
        });
    }
    catch (error) {
        res.status(400).json({
            msg: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.scheduleAppointmentController = scheduleAppointmentController;
const cancelAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            data: yield (0, Appointment_Service_1.cancelAppointmentService)(+req.params.id),
            msg: "Cambiar el estatus de un turno a “cancelled”."
        });
    }
    catch (error) {
        res.status(400).json({
            msg: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.cancelAppointmentController = cancelAppointmentController;
