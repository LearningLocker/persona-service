"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var memoryRepo_1 = require("jscommons/dist/memoryRepo");
var createIdentifier_1 = require("./createIdentifier");
var createPersona_1 = require("./createPersona");
var deletePersona_1 = require("./deletePersona");
var getIdentifier_1 = require("./getIdentifier");
var getIdentifierByIfi_1 = require("./getIdentifierByIfi");
var getIdentifiers_1 = require("./getIdentifiers");
var getIfisByPersona_1 = require("./getIfisByPersona");
var getPersona_1 = require("./getPersona");
var getPersonas_1 = require("./getPersonas");
var mergePersona_1 = require("./mergePersona");
var overwriteIdentifier_1 = require("./overwriteIdentifier");
var setIdentifierPersona_1 = require("./setIdentifierPersona");
exports.default = function (config) {
    return __assign({ createIdentifier: createIdentifier_1.default(config), createPersona: createPersona_1.default(config), deletePersona: deletePersona_1.default(config), getIdentifier: getIdentifier_1.default(config), getIdentifierByIfi: getIdentifierByIfi_1.default(config), getIdentifiers: getIdentifiers_1.default(config), getIfisByPersona: getIfisByPersona_1.default(config), getPersona: getPersona_1.default(config), getPersonas: getPersonas_1.default(config), mergePersona: mergePersona_1.default(config), overwriteIdentifier: overwriteIdentifier_1.default(config), setIdentifierPersona: setIdentifierPersona_1.default(config) }, memoryRepo_1.default(config));
};
//# sourceMappingURL=index.js.map