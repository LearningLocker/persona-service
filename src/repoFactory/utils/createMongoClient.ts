import { MongoClient } from 'mongodb';
import { Db } from 'mongodb';

export interface CreateMongoClientOptions {
  readonly options: object;
  readonly url: string;
}

const createMongoClient = ({
  options,
  url,
}: CreateMongoClientOptions): Promise<Db> => {

  return MongoClient.connect(
    url,
    options,
  );
};

export default createMongoClient;
