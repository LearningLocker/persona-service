"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-magic-numbers */
var dotenv_1 = require("dotenv");
dotenv_1.config();
var getBooleanOption_1 = require("jscommons/dist/config/getBooleanOption");
var getNumberOption_1 = require("jscommons/dist/config/getNumberOption");
var getStringOption_1 = require("jscommons/dist/config/getStringOption");
var lodash_1 = require("lodash");
var mongodb_1 = require("mongodb");
var os = require("os");
var DEFAULT_EXPRESS_PORT = 80;
var DEFAULT_TIMEOUT_MS = 300000; // 5 minutes.
var storageDir = process.cwd() + "/storage";
var expressPort = getNumberOption_1.default(process.env.EXPRESS_PORT, DEFAULT_EXPRESS_PORT);
var demoAuth = "http://localhost:" + expressPort + "/auth";
var accessLogsDir = storageDir + "/accessLogs";
var getMongoReadPreference = function (readPrefMode) {
    if (readPrefMode === void 0) { readPrefMode = 'PRIMARY'; }
    var mode = mongodb_1.ReadPreference.isValid(readPrefMode) ? readPrefMode : 'PRIMARY';
    return new mongodb_1.ReadPreference(mode, []);
};
var getMongoNumberOption = function (option) {
    return lodash_1.defaultTo(Number(option), undefined);
};
exports.default = {
    defaultTimeout: getNumberOption_1.default(process.env.DEFAULT_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
    express: {
        bodyParserLimit: getStringOption_1.default(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
        customRoute: getStringOption_1.default(process.env.EXPRESS_CUSTOM_ROUTE, 'status'),
        customRouteText: getStringOption_1.default(process.env.EXPRESS_CUSTOM_ROUTE_TEXT, 'ok'),
        morganDirectory: getStringOption_1.default(process.env.EXPRESS_MORGAN_DIRECTORY, accessLogsDir),
        port: expressPort,
    },
    fetchAuthRepo: {
        llClientInfoEndpoint: getStringOption_1.default(process.env.LL_CLIENT_INFO_ENDPOINT, demoAuth),
    },
    lang: getStringOption_1.default(process.env.LANG, 'en'),
    localStorageRepo: {
        storageDir: getStringOption_1.default(process.env.FS_LOCAL_STORAGE_DIR, storageDir),
    },
    mongoModelsRepo: {
        options: {
            acceptableLatencyMS: getMongoNumberOption(process.env.MONGO_ACCEPTABLE_LATENCY_MS),
            appname: process.env.MONGO_APP_NAME,
            bufferMaxEntries: getMongoNumberOption(process.env.MONGO_BUFFER_MAX_ENTRIES),
            connectTimeoutMS: getMongoNumberOption(process.env.MONGO_CONNECT_TIMEOUT_MS),
            maxStalenessSeconds: getMongoNumberOption(process.env.MONGO_MAX_STALENESS_SECONDS),
            poolSize: getMongoNumberOption(process.env.MONGO_POOL_SIZE),
            readConcern: {
                level: getStringOption_1.default(process.env.MONGO_READ_CONCERN, 'local'),
            },
            readPreference: getMongoReadPreference(process.env.MONGO_READ_PREFERENCE),
            secondaryAcceptableLatencyMS: getMongoNumberOption(process.env.MONGO_SECONDARY_ACCEPTABLE_LATENCY_MS),
            socketTimeoutMS: getMongoNumberOption(process.env.MONGO_SOCKET_TIMEOUT_MS),
        },
        url: getStringOption_1.default(process.env.MONGO_URL, 'mongodb://localhost:27017/xapiagents'),
    },
    repoFactory: {
        authRepoName: getStringOption_1.default(process.env.AUTH_REPO, 'fetch'),
        modelsRepoName: getStringOption_1.default(process.env.MODELS_REPO, 'memory'),
        storageRepoName: getStringOption_1.default(process.env.STORAGE_REPO, 'local'),
    },
    s3StorageRepo: {
        awsConfig: {
            accessKeyId: getStringOption_1.default(process.env.FS_S3_ACCESS_KEY_ID, ''),
            apiVersion: '2006-03-01',
            region: getStringOption_1.default(process.env.FS_S3_REGION, ''),
            secretAccessKey: getStringOption_1.default(process.env.FS_S3_SECRET_ACCESS_KEY, ''),
            signatureVersion: 'v4',
            sslEnabled: true,
        },
        bucketName: getStringOption_1.default(process.env.FS_S3_BUCKET, 'xapi-agents'),
        subFolder: getStringOption_1.default(process.env.FS_S3_BUCKET_SUBFOLDER, '/storage'),
    },
    winston: {
        cloudWatch: {
            awsConfig: {
                accessKeyId: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID, ''),
                region: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_REGION, ''),
                secretAccessKey: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY, ''),
            },
            enabled: getBooleanOption_1.default(process.env.WINSTON_CLOUDWATCH_ENABLED, false),
            level: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LEVEL, 'info'),
            logGroupName: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME, 'xapi-agents'),
            logStreamName: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME, os.hostname()),
        },
        console: {
            level: getStringOption_1.default(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
        },
    },
};
//# sourceMappingURL=config.js.map