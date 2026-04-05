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
exports.loginUserService = exports.registerUserService = exports.getUserByIdService = exports.getUserService = void 0;
const data_source_1 = require("../config/data-source");
const User_entity_1 = require("../entities/User.entity");
const User_repositories_1 = require("../repositories/User.repositories");
const Credential_service_1 = require("./Credential.service");
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_repositories_1.UserModel.find();
});
exports.getUserService = getUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield User_repositories_1.UserModel.findOne({
        where: {
            id
        },
        relations: ["appointments"]
    });
    if (!userFound)
        throw new Error(`El usuario con id ${id} no fue encontrado`);
    return userFound;
});
exports.getUserByIdService = getUserByIdService;
const registerUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionResult = yield data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const credentialCreated = yield (0, Credential_service_1.createCredentialService)(entityManager, user.username, user.password);
        const newUser = entityManager.create(User_entity_1.User, {
            birthdate: new Date(user.birthdate),
            email: user.email,
            name: user.name,
            nDni: user.nDni,
            credentials: credentialCreated
        });
        yield entityManager.save(newUser);
        return newUser;
    }));
    return transactionResult;
});
exports.registerUserService = registerUserService;
const loginUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialId = yield (0, Credential_service_1.checkCredentials)(user.username, user.password);
    const userFound = yield User_repositories_1.UserModel.findOne({
        where: {
            credentials: {
                id: credentialId
            }
        }
    });
    return {
        id: userFound === null || userFound === void 0 ? void 0 : userFound.id,
        name: userFound === null || userFound === void 0 ? void 0 : userFound.name,
        email: userFound === null || userFound === void 0 ? void 0 : userFound.email,
        birthdate: userFound === null || userFound === void 0 ? void 0 : userFound.birthdate,
        nDni: userFound === null || userFound === void 0 ? void 0 : userFound.nDni
    };
});
exports.loginUserService = loginUserService;
