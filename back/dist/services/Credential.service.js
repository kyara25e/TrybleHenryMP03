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
exports.checkCredentials = exports.createCredentialService = void 0;
const Credentials_entity_1 = require("../entities/Credentials.entity");
const Credentials_repositories_1 = require("../repositories/Credentials.repositories");
const crypPass = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hash = yield crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join("");
    return hashHex;
});
const checkUsernameExist = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialFound = yield Credentials_repositories_1.CredentialsModel.findOne({
        where: {
            username
        }
    });
    if (credentialFound)
        throw Error(`El username ${username} ya se encuentra en uso, intente con uno nuevo`);
});
const createCredentialService = (entityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    yield checkUsernameExist(username);
    const newCredential = entityManager.create(Credentials_entity_1.Credential, {
        username,
        password
    });
    yield entityManager.save(newCredential);
    return newCredential;
});
exports.createCredentialService = createCredentialService;
const checkCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialFound = yield Credentials_repositories_1.CredentialsModel.findOne({
        where: {
            username,
        }
    });
    if ((credentialFound === null || credentialFound === void 0 ? void 0 : credentialFound.password) !== password)
        throw Error('Credenciales invalidas');
    return credentialFound.id;
});
exports.checkCredentials = checkCredentials;
