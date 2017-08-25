"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var NoModel_1 = require("jscommons/dist/errors/NoModel");
var promiseRetry = require("promise-retry");
var Locked_1 = require("../errors/Locked");
var index_1 = require("./index");
var create = function (config) {
    return function (_a) {
        var organisation = _a.organisation, ifi = _a.ifi, personaName = _a.personaName;
        return __awaiter(_this, void 0, void 0, function () {
            var identifier, persona;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, config.repo.createIdentifier({
                            ifi: ifi,
                            locked: true,
                            organisation: organisation,
                        })];
                    case 1:
                        identifier = (_a.sent()).identifier;
                        return [4 /*yield*/, index_1.default(config).createPersona({
                                name: personaName,
                                organisation: organisation,
                            })];
                    case 2:
                        persona = (_a.sent()).persona;
                        return [4 /*yield*/, config.repo.setIdentifierPersona({
                                id: identifier.id,
                                locked: false,
                                organisation: organisation,
                                persona: persona.id,
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                identifierId: identifier.id,
                                personaId: persona.id,
                            }];
                }
            });
        });
    };
};
var createUpdateIdentifierPersona = function (config) {
    return function (_a) {
        var organisation = _a.organisation, ifi = _a.ifi, personaName = _a.personaName;
        return __awaiter(_this, void 0, void 0, function () {
            var identifierId, _a, foundIdentifier, locked, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, index_1.default(config).getIdentifierByIfi({
                                ifi: ifi,
                                organisation: organisation,
                            })];
                    case 1:
                        identifierId = (_b.sent()).identifierId;
                        return [4 /*yield*/, config.repo.getIdentifier({
                                id: identifierId,
                                organisation: organisation,
                            })];
                    case 2:
                        _a = _b.sent(), foundIdentifier = _a.identifier, locked = _a.locked;
                        if (locked === true) {
                            // We are locked, wait for unlock
                            throw new Locked_1.default();
                        }
                        // Shouldn't happen, as persona should always be set
                        if (foundIdentifier.persona === undefined) {
                            throw new Error('Identifier should have a persona');
                        }
                        // What should happen if persona name is different ???
                        return [2 /*return*/, {
                                identifierId: identifierId,
                                personaId: foundIdentifier.persona,
                            }];
                    case 3:
                        err_1 = _b.sent();
                        if (err_1 instanceof NoModel_1.default) {
                            return [2 /*return*/, create(config)({
                                    ifi: ifi,
                                    organisation: organisation,
                                    personaName: personaName,
                                })];
                        }
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
};
var retryCreateUpdateIdentifierPersona = function (config) {
    return function (opts) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var createUpdateIdentifierPersonaFn;
        return __generator(this, function (_a) {
            createUpdateIdentifierPersonaFn = createUpdateIdentifierPersona(config);
            return [2 /*return*/, promiseRetry(function (retry) { return __awaiter(_this, void 0, void 0, function () {
                    var err_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, createUpdateIdentifierPersonaFn(opts)];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                err_2 = _a.sent();
                                if (err_2 instanceof Locked_1.default) {
                                    return [2 /*return*/, retry(err_2)];
                                }
                                throw err_2;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, {
                    maxTimeout: 300,
                    minTimeout: 30,
                    retries: 3,
                })];
        });
    }); };
};
exports.default = retryCreateUpdateIdentifierPersona; // tslint:disable-line:max-file-line-count
//# sourceMappingURL=createUpdateIdentifierPersona.js.map