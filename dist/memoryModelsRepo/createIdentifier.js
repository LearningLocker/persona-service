"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var uuid_1 = require("uuid");
var PersonaNotSetAndUnlocked_1 = require("../errors/PersonaNotSetAndUnlocked");
var getIdentifiersMatchingIfi_1 = require("./utils/getIdentifiersMatchingIfi");
exports.default = function (config) {
    return function (_a) {
        var _b = _a.locked, locked = _b === void 0 ? true : _b, organisation = _a.organisation, persona = _a.persona, ifi = _a.ifi;
        return __awaiter(_this, void 0, void 0, function () {
            var matchingIdentifiers, isExistingIfi, identifier;
            return __generator(this, function (_a) {
                matchingIdentifiers = getIdentifiersMatchingIfi_1.default({
                    config: config,
                    ifi: ifi,
                    organisation: organisation,
                });
                if ((locked === false || locked === undefined) && persona === undefined) {
                    throw new PersonaNotSetAndUnlocked_1.default();
                }
                isExistingIfi = matchingIdentifiers.length !== 0;
                if (!isExistingIfi) {
                    identifier = {
                        id: uuid_1.v4(),
                        ifi: ifi,
                        organisation: organisation,
                        persona: persona,
                    };
                    config.state.personaIdentifiers = config.state.personaIdentifiers.concat([
                        __assign({}, identifier, { locked: locked }),
                    ]);
                    return [2 /*return*/, { identifier: identifier, wasCreated: true }];
                }
                return [2 /*return*/, {
                        identifier: matchingIdentifiers[0],
                        wasCreated: false,
                    }];
            });
        });
    };
};
//# sourceMappingURL=createIdentifier.js.map