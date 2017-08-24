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
var lodash_1 = require("lodash");
var InvalidCursor_1 = require("../../errors/InvalidCursor");
var GetOptions_1 = require("../../serviceFactory/utils/GetOptions");
var base64 = function (i) {
    return ((new Buffer(i, 'ascii')).toString('base64'));
};
var unbase64 = function (i) {
    return ((new Buffer(i, 'base64')).toString('ascii'));
};
exports.toCursor = function (data) {
    return base64(JSON.stringify(data));
};
exports.fromCursor = function (cursor) {
    try {
        var parsedCursor = JSON.parse(unbase64(cursor));
        if (parsedCursor === false) {
            return null;
        }
        return parsedCursor;
    }
    catch (err) {
        return null;
    }
};
var sortDirectionToOperator = function (sortDirection, cursorDirection) {
    /* istanbul ignore else  */ // This can't happen
    if (cursorDirection === GetOptions_1.CursorDirection.FORWARDS) {
        switch (sortDirection) {
            case 1:
                return '$gt';
            case -1:
                return '$lt';
            /* istanbul ignore next */ // This can't happen. As requested by Ryan.
            default:
                return null;
        }
    }
    else if (cursorDirection === GetOptions_1.CursorDirection.BACKWARDS) {
        switch (sortDirection) {
            case 1:
                return '$lt';
            case -1:
                return '$gt';
            /* istanbul ignore next */ // This can't happen. As requested by Ryan.
            default:
                return null;
        }
    }
    /* istanbul ignore next */ // This can't happen. As requested by Ryan.
    return null;
};
exports.cursorToFilter = function (_a) {
    var cursor = _a.cursor, sort = _a.sort, direction = _a.direction;
    if (cursor === undefined) {
        return {};
    }
    var parsedCursor = exports.fromCursor(cursor);
    var sortConditions = lodash_1.reduce(sort, function (_a, sortValue, sortKey) {
        var oldKeys = _a.oldKeys, conditions = _a.conditions;
        var operator = sortDirectionToOperator(sortValue, direction);
        // { _id: 1 } >>> { _id: { $gt: 'sampleid' } }
        if (parsedCursor === null) {
            throw new InvalidCursor_1.default();
        }
        /* istanbul ignore next */ // This can't happen. As requested by Ryan.
        if (operator === null) {
            throw new Error('Can not happen');
        }
        var latestCondition = (_b = {}, _b[sortKey] = (_c = {}, _c[operator] = lodash_1.result(parsedCursor, sortKey, parsedCursor), _c), _b);
        var oldConditions = lodash_1.zipObject(oldKeys, lodash_1.map(oldKeys, function (oldKey) { return lodash_1.result(parsedCursor, oldKey); }));
        var newConditions = __assign({}, oldConditions, latestCondition);
        return {
            conditions: conditions.concat([newConditions]),
            oldKeys: oldKeys.concat([sortKey]),
        };
        var _b, _c;
    }, { oldKeys: [], conditions: [] });
    var out = { $or: sortConditions.conditions };
    return out;
};
exports.modelToCursor = function (_a) {
    var model = _a.model, sort = _a.sort;
    var data = lodash_1.pick(model, lodash_1.keys(sort));
    var cursor = exports.toCursor(data);
    return cursor;
}; // tslint:disable-line: max-file-line-count
//# sourceMappingURL=cursor.js.map