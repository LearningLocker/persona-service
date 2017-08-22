"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var config_1 = require("../config");
var memoryModelsRepo_1 = require("../memoryModelsRepo");
var mongoModelsRepo_1 = require("../mongoModelsRepo");
exports.default = function () {
    switch (config_1.default.repoFactory.modelsRepoName) {
        case 'mongo':
            return mongoModelsRepo_1.default({
                db: mongodb_1.MongoClient.connect(config_1.default.mongoModelsRepo.url, config_1.default.mongoModelsRepo.options),
            });
        default:
        case 'memory':
            return memoryModelsRepo_1.default({
                state: {
                    personaIdentifiers: [],
                    personas: [],
                },
            });
    }
};
//# sourceMappingURL=index.js.map