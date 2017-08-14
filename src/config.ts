/* tslint:disable:no-magic-numbers */
import { config } from 'dotenv';
config();

import { S3 } from 'aws-sdk';
import getBooleanOption from 'jscommons/dist/config/getBooleanOption';
import getNumberOption from 'jscommons/dist/config/getNumberOption';
import getStringOption from 'jscommons/dist/config/getStringOption';
import { defaultTo } from 'lodash';
import { MongoClientOptions, ReadPreference } from 'mongodb';
import * as os from 'os';

const DEFAULT_EXPRESS_PORT = 80;
const DEFAULT_TIMEOUT_MS = 300000; // 5 minutes.

const storageDir = `${process.cwd()}/storage`;
const expressPort = getNumberOption(process.env.EXPRESS_PORT, DEFAULT_EXPRESS_PORT);
const demoAuth = `http://localhost:${expressPort}/auth`;
const accessLogsDir = `${storageDir}/accessLogs`;

const getMongoReadPreference = (readPrefMode = 'PRIMARY'): ReadPreference => {
  const mode = ReadPreference.isValid(readPrefMode) ? readPrefMode : 'PRIMARY';
  return new ReadPreference(mode, []);
};

const getMongoNumberOption = (option?: string) => {
  return defaultTo<number|undefined>(Number(option), undefined);
};

export default {
  defaultTimeout: getNumberOption(process.env.DEFAULT_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
  express: {
    bodyParserLimit: getStringOption(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
    customRoute: getStringOption(process.env.EXPRESS_CUSTOM_ROUTE, 'status'),
    customRouteText: getStringOption(process.env.EXPRESS_CUSTOM_ROUTE_TEXT, 'ok'),
    morganDirectory: getStringOption(process.env.EXPRESS_MORGAN_DIRECTORY, accessLogsDir),
    port: expressPort,
  },
  fetchAuthRepo: {
    llClientInfoEndpoint: getStringOption(process.env.LL_CLIENT_INFO_ENDPOINT, demoAuth),
  },
  lang: getStringOption(process.env.LANG, 'en'),
  localStorageRepo: {
    storageDir: getStringOption(process.env.FS_LOCAL_STORAGE_DIR, storageDir),
  },
  mongoModelsRepo: {
    options: {
      acceptableLatencyMS: getMongoNumberOption(process.env.MONGO_ACCEPTABLE_LATENCY_MS),
      appname: process.env.MONGO_APP_NAME, // Not supported below Mongo 3.4.
      bufferMaxEntries: getMongoNumberOption(process.env.MONGO_BUFFER_MAX_ENTRIES),
      connectTimeoutMS: getMongoNumberOption(process.env.MONGO_CONNECT_TIMEOUT_MS),
      maxStalenessSeconds: getMongoNumberOption(process.env.MONGO_MAX_STALENESS_SECONDS),
      poolSize: getMongoNumberOption(process.env.MONGO_POOL_SIZE),
      readConcern: {
        level: getStringOption(process.env.MONGO_READ_CONCERN, 'local'),
      },
      readPreference: getMongoReadPreference(process.env.MONGO_READ_PREFERENCE),
      secondaryAcceptableLatencyMS: getMongoNumberOption(
        process.env.MONGO_SECONDARY_ACCEPTABLE_LATENCY_MS,
      ),
      socketTimeoutMS: getMongoNumberOption(process.env.MONGO_SOCKET_TIMEOUT_MS),
    } as MongoClientOptions,
    url: getStringOption(process.env.MONGO_URL, 'mongodb://localhost:27017/xapiagents'),
  },
  repoFactory: {
    authRepoName: getStringOption(process.env.AUTH_REPO, 'fetch'),
    modelsRepoName: getStringOption(process.env.MODELS_REPO, 'memory'),
    storageRepoName: getStringOption(process.env.STORAGE_REPO, 'local'),
  },
  s3StorageRepo: {
    awsConfig: {
      accessKeyId: getStringOption(process.env.FS_S3_ACCESS_KEY_ID, ''),
      apiVersion: '2006-03-01',
      region: getStringOption(process.env.FS_S3_REGION, ''),
      secretAccessKey: getStringOption(process.env.FS_S3_SECRET_ACCESS_KEY, ''),
      signatureVersion: 'v4',
      sslEnabled: true,
    } as S3.ClientConfiguration,
    bucketName: getStringOption(process.env.FS_S3_BUCKET, 'xapi-agents'),
    subFolder: getStringOption(process.env.FS_S3_BUCKET_SUBFOLDER, '/storage'),
  },
  winston: {
    cloudWatch: {
      awsConfig: {
        accessKeyId: getStringOption(process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID, ''),
        region: getStringOption(process.env.WINSTON_CLOUDWATCH_REGION, ''),
        secretAccessKey: getStringOption(process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY, ''),
      },
      enabled: getBooleanOption(process.env.WINSTON_CLOUDWATCH_ENABLED, false),
      level: getStringOption(process.env.WINSTON_CLOUDWATCH_LEVEL, 'info'),
      logGroupName: getStringOption(process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME, 'xapi-agents'),
      logStreamName: getStringOption(process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME, os.hostname()),
    },
    console: {
      level: getStringOption(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
    },
  },
};
