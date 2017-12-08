import Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async () => {
    const identCollection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

    /* tslint:disable:object-literal-sort-keys */
    identCollection.createIndex({
      organisation: 1,
      ifi: 1,
    }, { unique: true, background: true});
    /* tslint:enable:object-literal-sort-keys */

  };
};
