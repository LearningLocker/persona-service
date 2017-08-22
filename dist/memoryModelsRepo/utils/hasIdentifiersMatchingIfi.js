"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getIdentifiersMatchingIfi_1 = require("./getIdentifiersMatchingIfi");
exports.default = function (_a) {
    var config = _a.config, organisation = _a.organisation, ifi = _a.ifi;
    var matchingIdentifiers = getIdentifiersMatchingIfi_1.default({ organisation: organisation, config: config, ifi: ifi });
    return matchingIdentifiers.length !== 0;
};
//# sourceMappingURL=hasIdentifiersMatchingIfi.js.map