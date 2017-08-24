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
var mongodb_1 = require("mongodb");
exports.default = function (ifi, organisation) {
    var valueFilter = (ifi.key === 'account'
        ? {
            'ifi.value.homePage': ifi.value.homePage,
            'ifi.value.name': ifi.value.name,
        }
        : {
            'ifi.value': ifi.value,
        });
    var out = __assign({ 'ifi.key': ifi.key }, valueFilter);
    return __assign({}, out, { organisation: new mongodb_1.ObjectID(organisation) });
};
//# sourceMappingURL=getIdentifierIfiFilter.js.map