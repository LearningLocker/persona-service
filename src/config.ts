/* tslint:disable:no-magic-numbers */
import { config } from 'dotenv';
config();

import { S3 } from 'aws-sdk';
import * as boolean from 'boolean';
import { defaultTo } from 'lodash';
import { MongoClientOptions, ReadPreference } from 'mongodb';

const DEFAULT_EXPRESS_PORT = 80;
const DEFAULT_TIMEOUT_MS = 300000; // 5 minutes.

const storageDir = `${process.cwd()}/storage`;
const expressPort = defaultTo<number>(Number(process.env.EXPRESS_PORT), DEFAULT_EXPRESS_PORT);
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
  defaultTimeout: defaultTo<number>(Number(process.env.DEFAULT_TIMEOUT_MS), DEFAULT_TIMEOUT_MS),
  express: {
    bodyParserLimit: defaultTo<string>(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
    customRoute: defaultTo<string>(process.env.EXPRESS_CUSTOM_ROUTE, 'status'),
    customRouteText: defaultTo<string>(process.env.EXPRESS_CUSTOM_ROUTE_TEXT, 'ok'),
    morganDirectory: defaultTo<string>(process.env.EXPRESS_MORGAN_DIRECTORY, accessLogsDir),
    port: expressPort,
  },
  lang: defaultTo<string>(process.env.LANG, 'en'),
  llClientInfoEndpoint: defaultTo<string>(process.env.LL_CLIENT_INFO_ENDPOINT, demoAuth),
  localStorageRepo: {
    storageDir: defaultTo<string>(process.env.FS_LOCAL_STORAGE_DIR, storageDir),
  },
  mongoModelsRepo: {
    options: {
      acceptableLatencyMS: getMongoNumberOption(process.env.MONGO_ACCEPTABLE_LATENCY_MS),
      appname: defaultTo<string>(process.env.MONGO_APP_NAME, 'xapiagents'),
      bufferMaxEntries: getMongoNumberOption(process.env.MONGO_BUFFER_MAX_ENTRIES),
      connectTimeoutMS: getMongoNumberOption(process.env.MONGO_CONNECT_TIMEOUT_MS),
      maxStalenessSeconds: getMongoNumberOption(process.env.MONGO_MAX_STALENESS_SECONDS),
      poolSize: getMongoNumberOption(process.env.MONGO_POOL_SIZE),
      readConcern: defaultTo<string>(process.env.MONGO_READ_CONCERN, 'local'),
      readPreference: getMongoReadPreference(process.env.MONGO_READ_PREFERENCE),
      secondaryAcceptableLatencyMS: getMongoNumberOption(
        process.env.MONGO_SECONDARY_ACCEPTABLE_LATENCY_MS,
      ),
      socketTimeoutMS: getMongoNumberOption(process.env.MONGO_SOCKET_TIMEOUT_MS),
    } as MongoClientOptions,
    url: defaultTo<string>(process.env.MONGO_URL, 'mongodb://localhost:27017/xapiagents'),
  },
  repoFactory: {
    modelsRepoName: defaultTo<string>(process.env.MODELS_REPO, 'memory'),
    storageRepoName: defaultTo<string>(process.env.STORAGE_REPO, 'local'),
  },
  s3StorageRepo: {
    awsConfig: {
      accessKeyId: defaultTo<string>(String(process.env.FS_S3_ACCESS_KEY_ID), ''),
      apiVersion: '2006-03-01',
      region: defaultTo<string>(String(process.env.FS_S3_REGION), ''),
      secretAccessKey: defaultTo<string>(String(process.env.FS_S3_SECRET_ACCESS_KEY), ''),
      signatureVersion: 'v4',
      sslEnabled: true,
    } as S3.ClientConfiguration,
    bucketName: defaultTo<string>(process.env.FS_S3_BUCKET, 'xapi-agents'),
    subFolder: defaultTo<string>(process.env.FS_S3_BUCKET_SUBFOLDER, '/storage'),
  },
  winston: {
    cloudWatch: {
      awsConfig: {
        accessKeyId: defaultTo<string>(process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID, ''),
        region: defaultTo<string>(process.env.WINSTON_CLOUDWATCH_REGION, ''),
        secretAccessKey: defaultTo<string>(process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY, ''),
      },
      enabled: defaultTo<boolean>(boolean(process.env.WINSTON_CLOUDWATCH_ENABLED), false),
      level: defaultTo<string>(process.env.WINSTON_CLOUDWATCH_LEVEL, 'info'),
      logGroupName: defaultTo<string>(process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME, 'xapi-agents'),
      logStreamName: process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME,
    },
    console: {
      level: defaultTo<string>(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
    },
  },
};
