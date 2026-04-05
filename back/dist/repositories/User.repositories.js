"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const data_source_1 = require("../config/data-source");
const User_entity_1 = require("../entities/User.entity");
exports.UserModel = data_source_1.AppDataSource.getRepository(User_entity_1.User);
