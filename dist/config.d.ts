import { S3 } from 'aws-sdk';
import { MongoClientOptions } from 'mongodb';
declare const _default: {
    defaultTimeout: number;
    express: {
        bodyParserLimit: string;
        customRoute: string;
        customRouteText: string;
        morganDirectory: string;
        port: number;
    };
    fetchAuthRepo: {
        llClientInfoEndpoint: string;
    };
    lang: string;
    localStorageRepo: {
        storageDir: string;
    };
    mongoModelsRepo: {
        options: MongoClientOptions;
        url: string;
    };
    repoFactory: {
        authRepoName: string;
        modelsRepoName: string;
        storageRepoName: string;
    };
    s3StorageRepo: {
        awsConfig: S3.ClientConfiguration;
        bucketName: string;
        subFolder: string;
    };
    winston: {
        cloudWatch: {
            awsConfig: {
                accessKeyId: string;
                region: string;
                secretAccessKey: string;
            };
            enabled: boolean;
            level: string;
            logGroupName: string;
            logStreamName: string;
        };
        console: {
            level: string;
        };
    };
};
export default _default;
