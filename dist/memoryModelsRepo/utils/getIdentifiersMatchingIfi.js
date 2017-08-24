"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchIdentifierIfi_1 = require("./matchIdentifierIfi");
exports.default = function (_a) {
    var config = _a.config, organisation = _a.organisation, ifi = _a.ifi;
    return config.state.personaIdentifiers.filter(function (identifier) {
        return matchIdentifierIfi_1.default({ identifier: identifier, organisation: organisation, ifi: ifi });
    });
};
//# sourceMappingURL=getIdentifiersMatchingIfi.js.map