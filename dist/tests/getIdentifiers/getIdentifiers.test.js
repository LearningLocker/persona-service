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
var assertError_1 = require("jscommons/dist/tests/utils/assertError");
var lodash_1 = require("lodash");
var NoCursorBackwardsDirection_1 = require("../../errors/NoCursorBackwardsDirection");
var cursor_1 = require("../../repoFactory/utils/cursor");
var GetOptions_1 = require("../../serviceFactory/utils/GetOptions");
var createTestPersona_1 = require("../utils/createTestPersona");
var setup_1 = require("../utils/setup");
var values_1 = require("../utils/values");
describe('getIdentifiers', function () {
    var service = setup_1.default();
    var getIdentifiersOptions = {
        direction: GetOptions_1.CursorDirection.FORWARDS,
        filter: {},
        limit: 10,
        maxScan: 0,
        maxTimeMS: 0,
        organisation: values_1.TEST_ORGANISATION,
        project: {},
        sort: {
            'ifi.value': 1,
        },
    };
    var fromFirstCursor = cursor_1.modelToCursor({
        model: {
            ifi: {
                value: '1_test@test.com',
            },
        },
        sort: {
            'ifi.value': 1,
        },
    });
    var addTestIdentifiers = function () { return __awaiter(_this, void 0, void 0, function () {
        var persona, NUM_IDENTIFERS, resultsPromise, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTestPersona_1.default()];
                case 1:
                    persona = _a.sent();
                    NUM_IDENTIFERS = 12;
                    resultsPromise = lodash_1.times(NUM_IDENTIFERS, function (i) {
                        return service.createIdentifier({
                            ifi: {
                                key: 'mbox',
                                value: i + "_" + values_1.TEST_IFI.value,
                            },
                            organisation: values_1.TEST_ORGANISATION,
                            persona: persona.id,
                        });
                    });
                    return [4 /*yield*/, Promise.all(resultsPromise)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, lodash_1.map(results, function (_a) {
                            var identifier = _a.identifier;
                            return identifier;
                        })];
            }
        });
    }); };
    it('Should return the first 10 items', function () { return __awaiter(_this, void 0, void 0, function () {
        var identifiers, identifiersResults, TEN;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addTestIdentifiers()];
                case 1:
                    identifiers = _a.sent();
                    return [4 /*yield*/, service.getIdentifiers({
                            cursor: undefined,
                            direction: GetOptions_1.CursorDirection.FORWARDS,
                            filter: {},
                            hint: {},
                            limit: 10,
                            maxScan: 0,
                            maxTimeMS: 0,
                            organisation: values_1.TEST_ORGANISATION,
                            project: {},
                            sort: {
                                'ifi.value': 1,
                            },
                        })];
                case 2:
                    identifiersResults = _a.sent();
                    TEN = 10;
                    assert.equal(identifiersResults.edges.length, TEN);
                    assert.equal(identifiersResults.edges[0].node.ifi.value, '0_test@test.com');
                    assert.equal(identifiersResults.edges[identifiersResults.edges.length - 1].node.ifi.value, '7_test@test.com');
                    assert.equal(identifiersResults.edges[0].cursor, cursor_1.modelToCursor({
                        model: {
                            ifi: {
                                value: '0_test@test.com',
                            },
                        },
                        sort: {
                            'ifi.value': 1,
                        },
                    }));
                    assert.equal(identifiersResults.pageInfo.startCursor, identifiersResults.edges[0].cursor);
                    assert.equal(identifiersResults.pageInfo.endCursor, identifiersResults.edges[identifiersResults.edges.length - 1].cursor);
                    assert.equal(identifiersResults.pageInfo.hasPreviousPage, false);
                    assert.equal(identifiersResults.pageInfo.hasNextPage, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return the last 2 identifiers', function () { return __awaiter(_this, void 0, void 0, function () {
        var identifiers, fromCursor, identifiersResults, TWO;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addTestIdentifiers()];
                case 1:
                    identifiers = _a.sent();
                    fromCursor = cursor_1.modelToCursor({
                        model: {
                            ifi: {
                                value: '7_test@test.com',
                            },
                        },
                        sort: {
                            'ifi.value': 1,
                        },
                    });
                    return [4 /*yield*/, service.getIdentifiers(lodash_1.assign({}, getIdentifiersOptions, {
                            cursor: fromCursor,
                        }))];
                case 2:
                    identifiersResults = _a.sent();
                    TWO = 2;
                    assert.equal(identifiersResults.edges.length, TWO);
                    assert.equal(identifiersResults.pageInfo.hasNextPage, false);
                    assert.equal(identifiersResults.pageInfo.hasPreviousPage, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should throw error when direction is BACKWARDS and cursor is undefined', function () { return __awaiter(_this, void 0, void 0, function () {
        var identifiers, identifiersPromise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addTestIdentifiers()];
                case 1:
                    identifiers = _a.sent();
                    identifiersPromise = service.getIdentifiers(lodash_1.assign({}, getIdentifiersOptions, {
                        direction: GetOptions_1.CursorDirection.BACKWARDS,
                    }));
                    return [2 /*return*/, assertError_1.default(NoCursorBackwardsDirection_1.default, identifiersPromise)];
            }
        });
    }); });
    it('Should return the previous 2 cursors when direction is BACKWARDS', function () { return __awaiter(_this, void 0, void 0, function () {
        var identifiers, identifiersResult, THREE;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addTestIdentifiers()];
                case 1:
                    identifiers = _a.sent();
                    return [4 /*yield*/, service.getIdentifiers(lodash_1.assign({}, getIdentifiersOptions, {
                            cursor: fromFirstCursor,
                            direction: GetOptions_1.CursorDirection.BACKWARDS,
                        }))];
                case 2:
                    identifiersResult = _a.sent();
                    THREE = 3;
                    assert.equal(identifiersResult.edges.length, THREE);
                    assert.equal(identifiersResult.pageInfo.hasNextPage, true);
                    assert.equal(identifiersResult.pageInfo.hasPreviousPage, false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return undefiend cursor, if no identifiers', function () { return __awaiter(_this, void 0, void 0, function () {
        var identifiersResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.getIdentifiers(lodash_1.assign({}, getIdentifiersOptions, {
                        limit: 1,
                    }))];
                case 1:
                    identifiersResult = _a.sent();
                    assert.equal(identifiersResult.pageInfo.endCursor, undefined);
                    assert.equal(identifiersResult.pageInfo.startCursor, undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return the previous 1 cursors when limit 1', function () { return __awaiter(_this, void 0, void 0, function () {
        var identifiers, identifiersResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addTestIdentifiers()];
                case 1:
                    identifiers = _a.sent();
                    return [4 /*yield*/, service.getIdentifiers(lodash_1.assign({}, getIdentifiersOptions, {
                            cursor: fromFirstCursor,
                            direction: GetOptions_1.CursorDirection.BACKWARDS,
                            limit: 1,
                        }))];
                case 2:
                    identifiersResult = _a.sent();
                    assert.equal(identifiersResult.edges.length, 1);
                    assert.equal(identifiersResult.pageInfo.hasNextPage, true);
                    assert.equal(identifiersResult.pageInfo.hasPreviousPage, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should test $and clause', function () { return __awaiter(_this, void 0, void 0, function () {
        var identifiersResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addTestIdentifiers()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, service.getIdentifiers(lodash_1.assign({}, getIdentifiersOptions, {
                            filter: {
                                $and: [{
                                        'ifi.value': { $eq: '9_test@test.com' },
                                    }],
                            },
                            limit: 6,
                            sort: {
                                'ifi.value': -1,
                            },
                        }))];
                case 2:
                    identifiersResult = _a.sent();
                    assert.equal(identifiersResult.edges.length, 1);
                    assert.equal(identifiersResult.edges[0].node.ifi.value, '9_test@test.com');
                    return [2 /*return*/];
            }
        });
    }); });
}); // tslint:disable-line: max-file-line-count
//# sourceMappingURL=getIdentifiers.test.js.map