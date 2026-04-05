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
exports.AppointmentModel = void 0;
const data_source_1 = require("../config/data-source");
const Appointment_entity_1 = require("../entities/Appointment.entity");
const Appointment_Interface_1 = require("../Interface/Appointment.Interface");
exports.AppointmentModel = data_source_1.AppDataSource.getRepository(Appointment_entity_1.Appointment).extend({
    validateAllowAppointment: function (date, time) {
        const [hours, minutes] = time.split(':').map(Number);
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours, minutes, 0);
        const appointmentDateArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
        const nowArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);
        const dayOfWeek = appointmentDateArg.getUTCDay();
        if (appointmentDateArg < nowArg)
            throw Error('No se pueden agendar citas para fechas pasadas');
        if (dayOfWeek === 5 || dayOfWeek === 6)
            throw Error('No es posible agendar citas los fines de semana');
        if (hours < 8 || hours > 17)
            throw Error('Solo se pueden agendar citas entre las 8 am y las 6 pm');
    },
    validateExistApp: function (userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const appFound = yield this.findOne({
                where: {
                    user: {
                        id: userId
                    },
                    date: new Date(date),
                    time: time,
                    status: Appointment_Interface_1.Status.active
                }
            });
            if (appFound)
                throw Error(`La cita para el usuario con id ${userId}, fecha ${date}, y hora ${time} ya existe.`);
        });
    }
});
