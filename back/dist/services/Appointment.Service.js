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
exports.cancelAppointmentService = exports.registerAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentService = void 0;
const Appointment_Interface_1 = require("../Interface/Appointment.Interface");
const Appointment_repositories_1 = require("../repositories/Appointment.repositories");
const User_service_1 = require("./User.service");
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentsFound = yield Appointment_repositories_1.AppointmentModel.find();
    if (appointmentsFound.length === 0)
        throw Error("No hay citas disponibles");
    return appointmentsFound;
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appFound = yield Appointment_repositories_1.AppointmentModel.findOne({
        where: {
            id: id
        }
    });
    if (!appFound)
        throw new Error(`La cita con id ${id} no fue encontrada`);
    return appFound;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const registerAppointmentService = (app) => __awaiter(void 0, void 0, void 0, function* () {
    Appointment_repositories_1.AppointmentModel.validateAllowAppointment(app.date, app.time);
    yield Appointment_repositories_1.AppointmentModel.validateExistApp(app.userId, app.date, app.time);
    const userFound = yield (0, User_service_1.getUserByIdService)(app.userId);
    const newAppointment = Appointment_repositories_1.AppointmentModel.create({
        date: new Date(app.date),
        time: app.time,
        user: userFound,
    });
    return yield Appointment_repositories_1.AppointmentModel.save(newAppointment);
});
exports.registerAppointmentService = registerAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appFound = yield (0, exports.getAppointmentByIdService)(id);
    appFound.status = Appointment_Interface_1.Status.cancelled;
    return yield Appointment_repositories_1.AppointmentModel.save(appFound);
});
exports.cancelAppointmentService = cancelAppointmentService;
