"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sourceMapSupport = require("source-map-support");
sourceMapSupport.install();
var logger_1 = require("./logger");
var repoFactory_1 = require("./repoFactory");
var repoFacade = repoFactory_1.default();
repoFacade.rollback().then(function () {
    logger_1.default.info('Completed rollback');
    process.exit();
}).catch(function (err) {
    logger_1.default.error(err);
    process.exit();
});
//# sourceMappingURL=rollback.js.map