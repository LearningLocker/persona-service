/* tslint:disable:no-magic-numbers */
import { config } from 'dotenv';
config();

import getBooleanOption from 'jscommons/dist/config/getBooleanOption';
import getNumberOption from 'jscommons/dist/config/getNumberOption';
import getStringOption from 'jscommons/dist/config/getStringOption';
import { defaultTo } from 'lodash';
import {
  MongoClientOptions,
  ReadPreference,
  ReadPreferenceMode,
} from 'mongodb';
import * as os from 'os';

const DEFAULT_TIMEOUT_MS = 300000; // 5 minutes.

const getMongoReadPreference = (readPrefMode = 'primary'): ReadPreference => {
  const mode = (
    ReadPreference.isValid(readPrefMode) ? readPrefMode : 'primary'
  ) as ReadPreferenceMode;

  return new ReadPreference(mode, []);
};

const getMongoNumberOption = (option?: string) => {
  return defaultTo<number|undefined>(Number(option), undefined);
};

const DEFAULT_IDENTIFIER_LOCK_EXPIRATION_MS = 30000; // 30 seconds.
export const IDENTIFIER_LOCK_EXPIRATION_MS = getNumberOption(
  process.env.IDENTIFIER_LOCK_EXPIRATION_MS,
  DEFAULT_IDENTIFIER_LOCK_EXPIRATION_MS,
);

export default {
  defaultTimeout: getNumberOption(process.env.DEFAULT_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
  lang: getStringOption(process.env.LANG, 'en'),
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
    url: getStringOption(process.env.MONGO_URL, 'mongodb://localhost:27017/persona-service'),
  },
  repoFactory: {
    modelsRepoName: getStringOption(process.env.MODELS_REPO, 'mongo'),
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
      logGroupName: getStringOption(
        process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME,
        'persona-service',
      ),
      logStreamName: getStringOption(process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME, os.hostname()),
    },
    console: {
      level: getStringOption(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
    },
  },
};
