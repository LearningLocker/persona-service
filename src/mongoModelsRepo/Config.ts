import { Db } from 'mongodb';

interface Config {
  db: Promise<Db>;
}

export default Config;
