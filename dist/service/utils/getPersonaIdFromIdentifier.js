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
var promiseRetry = require("promise-retry");
var InvalidGetPersonaFromIdentifierOptions_1 = require("../../errors/InvalidGetPersonaFromIdentifierOptions");
var UnassignedPersonaOnIdentifier_1 = require("../../errors/UnassignedPersonaOnIdentifier");
var logger_1 = require("../../logger");
var getPersonaIdFromIdentifier = function (_a) {
    var organisation = _a.organisation, config = _a.config, identifier = _a.identifier, wasCreated = _a.wasCreated;
    return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var persona;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (wasCreated && identifier.persona !== undefined) {
                        throw new InvalidGetPersonaFromIdentifierOptions_1.default('Identifier was marked as wasCreated, but allready had a persona on it');
                    }
                    if (!wasCreated) return [3 /*break*/, 3];
                    return [4 /*yield*/, config.repo.createPersona({ organisation: organisation })];
                case 1:
                    persona = (_a.sent()).persona;
                    return [4 /*yield*/, config.repo.setIdentifierPersona({
                            id: identifier.id,
                            organisation: organisation,
                            persona: persona.id,
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, persona.id];
                case 3:
                    if (!wasCreated && identifier.persona !== undefined) {
                        return [2 /*return*/, identifier.persona];
                    }
                    else {
                        // Shouldn't happen, but just in case, retry 3 times, with backoff
                        return [2 /*return*/, promiseRetry(function (retry) { return __awaiter(_this, void 0, void 0, function () {
                                var identifier2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, config.repo.getIdentifier({
                                                id: identifier.id,
                                                organisation: organisation,
                                            })];
                                        case 1:
                                            identifier2 = (_a.sent()).identifier;
                                            if (identifier2.persona === undefined) {
                                                logger_1.default.warn('uploadproflies retrying finding identifier persona');
                                                return [2 /*return*/, retry(new UnassignedPersonaOnIdentifier_1.default())];
                                            }
                                            return [2 /*return*/, identifier2.persona];
                                    }
                                });
                            }); }, {
                                maxTimeout: 300,
                                minTimeout: 50,
                                retries: 3,
                            })];
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.default = getPersonaIdFromIdentifier;
//# sourceMappingURL=getPersonaIdFromIdentifier.js.map