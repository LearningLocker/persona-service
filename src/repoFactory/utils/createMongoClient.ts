import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

export interface CreateMongoClientOptions {
  readonly options: object;
  readonly url: string;
}

const createMongoClient = async ({
  options,
  url,
}: CreateMongoClientOptions): Promise<Db> => {
  const client = await MongoClient.connect(
    url,
    options,
  );

  return client.db();
};

export default createMongoClient;
