"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsModel = void 0;
const data_source_1 = require("../config/data-source");
const Credentials_entity_1 = require("../entities/Credentials.entity");
exports.CredentialsModel = data_source_1.AppDataSource.getRepository(Credentials_entity_1.Credential);
