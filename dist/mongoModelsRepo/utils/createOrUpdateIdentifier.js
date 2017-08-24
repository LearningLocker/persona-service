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
var createOrUpdateIdentifier = function (config) { return function (_a) {
    var filter = _a.filter, update = _a.update, upsert = _a.upsert;
    return __awaiter(_this, void 0, void 0, function () {
        var collection, opResult, document, identifier, wasCreated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, config.db];
                case 1:
                    collection = (_a.sent()).collection('personaIdentifiers');
                    return [4 /*yield*/, collection.findOneAndUpdate(filter, update, {
                            returnOriginal: false,
                            upsert: upsert,
                        })];
                case 2:
                    opResult = _a.sent();
                    // upsert === false and no model has been found.
                    if (opResult.lastErrorObject.updatedExisting === false && opResult.lastErrorObject.n === 0) {
                        throw new NoModel_1.default('Persona Identifier');
                    }
                    document = opResult.value;
                    identifier = {
                        id: document._id.toString(),
                        ifi: document.ifi,
                        organisation: document.organisation.toString(),
                        persona: document.persona,
                    };
                    wasCreated = opResult.lastErrorObject.upserted !== undefined;
                    return [2 /*return*/, { identifier: identifier, wasCreated: wasCreated }];
            }
        });
    });
}; };
exports.default = createOrUpdateIdentifier;
//# sourceMappingURL=createOrUpdateIdentifier.js.map