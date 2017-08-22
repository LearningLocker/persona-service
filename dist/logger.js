"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("jscommons/dist/winston");
var config_1 = require("./config");
exports.default = winston_1.default({
    cloudWatch: {
        awsConfig: {
            accessKeyId: config_1.default.winston.cloudWatch.awsConfig.accessKeyId,
            region: config_1.default.winston.cloudWatch.awsConfig.region,
            secretAccessKey: config_1.default.winston.cloudWatch.awsConfig.secretAccessKey,
        },
        enabled: config_1.default.winston.cloudWatch.enabled,
        level: config_1.default.winston.cloudWatch.level,
        logGroupName: config_1.default.winston.cloudWatch.logGroupName,
        logStreamName: config_1.default.winston.cloudWatch.logStreamName,
    },
    console: {
        level: config_1.default.winston.console.level,
    },
});
//# sourceMappingURL=logger.js.map