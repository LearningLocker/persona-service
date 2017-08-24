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
var assert = require("assert");
var createTestPersona_1 = require("../utils/createTestPersona");
var setup_1 = require("../utils/setup");
var values_1 = require("../utils/values");
describe('overwriteIdentifier', function () {
    var service = setup_1.default();
    it('Should overwrite an identifier', function () { return __awaiter(_this, void 0, void 0, function () {
        var persona, persona2, shouldBeSameIdentifier, identifier, wasCreated, actualIdentifier;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTestPersona_1.default()];
                case 1:
                    persona = _a.sent();
                    return [4 /*yield*/, service.createPersona({
                            name: 'Dave 2',
                            organisation: values_1.TEST_ORGANISATION,
                        })];
                case 2:
                    persona2 = (_a.sent()).persona;
                    return [4 /*yield*/, service.createIdentifier({
                            ifi: values_1.TEST_OPENID_IFI,
                            organisation: values_1.TEST_ORGANISATION,
                            persona: persona.id,
                        })];
                case 3:
                    shouldBeSameIdentifier = (_a.sent()).identifier;
                    return [4 /*yield*/, service.createIdentifier({
                            ifi: values_1.TEST_IFI,
                            organisation: values_1.TEST_ORGANISATION,
                            persona: persona.id,
                        })];
                case 4:
                    identifier = (_a.sent()).identifier;
                    return [4 /*yield*/, service.overwriteIdentifier({
                            ifi: values_1.TEST_IFI,
                            organisation: values_1.TEST_ORGANISATION,
                            persona: persona2.id,
                        })];
                case 5:
                    wasCreated = (_a.sent()).wasCreated;
                    return [4 /*yield*/, service.getIdentifier({
                            id: identifier.id,
                            organisation: values_1.TEST_ORGANISATION,
                        })];
                case 6:
                    actualIdentifier = (_a.sent()).identifier;
                    assert.equal(wasCreated, false);
                    assert.deepEqual(actualIdentifier.persona, persona2.id);
                    assert.equal(shouldBeSameIdentifier.persona, persona.id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should create on identifier if it does not exist', function () { return __awaiter(_this, void 0, void 0, function () {
        var persona, _a, identifier, wasCreated, actualIdentifier;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, createTestPersona_1.default()];
                case 1:
                    persona = _b.sent();
                    return [4 /*yield*/, service.overwriteIdentifier({
                            ifi: values_1.TEST_IFI,
                            organisation: values_1.TEST_ORGANISATION_OUTSIDE_STORE,
                            persona: persona.id,
                        })];
                case 2:
                    _a = _b.sent(), identifier = _a.identifier, wasCreated = _a.wasCreated;
                    return [4 /*yield*/, service.getIdentifier({
                            id: identifier.id,
                            organisation: values_1.TEST_ORGANISATION_OUTSIDE_STORE,
                        })];
                case 3:
                    actualIdentifier = (_b.sent()).identifier;
                    assert.equal(wasCreated, true);
                    assert.deepEqual(actualIdentifier.persona, persona.id);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=overwriteIdentifier.test.js.map