"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (_a) {
    var organisation = _a.organisation, identifier = _a.identifier, ifi = _a.ifi;
    var storedIfi = identifier.ifi;
    if (identifier.organisation !== organisation) {
        return false;
    }
    if (storedIfi.key === 'account' && ifi.key === 'account') {
        return (storedIfi.value.homePage === ifi.value.homePage &&
            storedIfi.value.name === ifi.value.name);
    }
    return (storedIfi.key === ifi.key &&
        storedIfi.value === ifi.value);
};
//# sourceMappingURL=matchIdentifierIfi.js.map