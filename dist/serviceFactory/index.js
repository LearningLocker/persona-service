"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var repoFactory_1 = require("../repoFactory");
var service_1 = require("../service");
exports.default = function () {
    var repoFacade = repoFactory_1.default();
    return service_1.default({
        repo: repoFacade,
    });
};
//# sourceMappingURL=index.js.map