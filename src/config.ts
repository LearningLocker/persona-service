import { config } from 'dotenv';
config();

import { S3 } from 'aws-sdk';
import * as boolean from 'boolean';
import { defaultTo } from 'lodash';

const DEFAULT_EXPRESS_PORT = 80;
const DEFAULT_TIMEOUT_MS = 300000; // 5 minutes.

const storageDir = `${process.cwd()}/storage`;
const expressPort = defaultTo<number>(Number(process.env.EXPRESS_PORT), DEFAULT_EXPRESS_PORT);
const demoAuth = `http://localhost:${expressPort}/auth`;
const accessLogsDir = `${storageDir}/accessLogs`;

export default {
  defaultTimeout: defaultTo<number>(Number(process.env.DEFAULT_TIMEOUT_MS), DEFAULT_TIMEOUT_MS),
  express: {
    bodyParserLimit: defaultTo<string>(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
    customRoute: defaultTo<string>(process.env.EXPRESS_CUSTOM_ROUTE, 'status'),
    customRouteText: defaultTo<string>(process.env.EXPRESS_CUSTOM_ROUTE_TEXT, 'ok'),
    morganDirectory: defaultTo<string>(process.env.EXPRESS_MORGAN_DIRECTORY, accessLogsDir),
    port: expressPort,
  },
  fetchAuthRepo: {
    llClientInfoEndpoint: defaultTo<string>(process.env.LL_CLIENT_INFO_ENDPOINT, demoAuth),
  },
  lang: defaultTo<string>(process.env.LANG, 'en'),
  localStorageRepo: {
    storageDir: defaultTo<string>(process.env.FS_LOCAL_STORAGE_DIR, storageDir),
  },
  mongoModelsRepo: {
    url: defaultTo<string>(process.env.MONGO_URL, 'mongodb://localhost:27017/xapiagents'),
  },
  repoFactory: {
    authRepoName: defaultTo<string>(process.env.AUTH_REPO, 'fetch'),
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
