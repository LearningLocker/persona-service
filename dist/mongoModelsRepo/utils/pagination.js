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
var lodash_1 = require("lodash");
var mongodb_1 = require("mongodb");
var NoCursorBackwardsDirection_1 = require("../../errors/NoCursorBackwardsDirection");
var cursor_1 = require("../../repoFactory/utils/cursor");
var GetOptions_1 = require("../../serviceFactory/utils/GetOptions");
exports.default = function (config, collectionName) {
    return function (_a) {
        var filter = _a.filter, limit = _a.limit, maxScan = _a.maxScan, maxTimeMS = _a.maxTimeMS, cursor = _a.cursor, direction = _a.direction, organisation = _a.organisation, project = _a.project, sort = _a.sort, hint = _a.hint;
        return __awaiter(_this, void 0, void 0, function () {
            var collection, theFilter, mongoCursor, mongoCursor2, result, returnResult, edges, lastEdge, firstEdge, result2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (direction === GetOptions_1.CursorDirection.BACKWARDS && cursor === undefined) {
                            throw new NoCursorBackwardsDirection_1.default();
                        }
                        return [4 /*yield*/, config.db];
                    case 1:
                        collection = (_a.sent()).collection(collectionName);
                        theFilter = __assign({}, filter, cursor_1.cursorToFilter({
                            cursor: cursor,
                            direction: direction,
                            sort: sort,
                        }), { organisation: new mongodb_1.ObjectID(organisation) });
                        mongoCursor = collection.find() // tslint:disable-line:deprecation
                            .filter(theFilter)
                            .sort(sort)
                            .project(project)
                            .limit(limit + 1)
                            .maxTimeMS(maxTimeMS)
                            .maxScan(maxScan);
                        mongoCursor2 = (function (hint2, cursor3) {
                            if (hint2 !== undefined) {
                                return cursor3.hint(hint2);
                            }
                            return cursor3;
                        })(hint, mongoCursor);
                        return [4 /*yield*/, mongoCursor2.toArray()];
                    case 2:
                        result = _a.sent();
                        returnResult = result.slice(0, limit);
                        edges = returnResult.map(function (document) { return ({
                            cursor: cursor_1.modelToCursor({
                                model: document,
                                sort: sort,
                            }),
                            node: document,
                        }); });
                        lastEdge = lodash_1.last(edges);
                        firstEdge = lodash_1.first(edges);
                        result2 = {
                            edges: edges,
                            pageInfo: {
                                endCursor: lastEdge === undefined ? undefined : lastEdge.cursor,
                                hasNextPage: (direction === GetOptions_1.CursorDirection.BACKWARDS && cursor !== undefined) ||
                                    direction === GetOptions_1.CursorDirection.FORWARDS && result.length > limit,
                                hasPreviousPage: (direction === GetOptions_1.CursorDirection.FORWARDS && cursor !== undefined) ||
                                    direction === GetOptions_1.CursorDirection.BACKWARDS && result.length > limit,
                                startCursor: firstEdge === undefined ? undefined : firstEdge.cursor,
                            },
                        };
                        return [2 /*return*/, result2];
                }
            });
        });
    };
};
//# sourceMappingURL=pagination.js.map