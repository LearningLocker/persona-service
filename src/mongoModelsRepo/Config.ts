import type { Db } from 'mongodb';

interface Config {
  readonly db: Promise<Db>;
}

export default Config;
