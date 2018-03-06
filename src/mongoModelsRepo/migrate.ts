import Config from './Config';
import {
  PERSONA_ATTRIBUTES_COLLECTION,
  PERSONA_IDENTIFIERS_COLLECTION,
} from './utils/constants/collections';

export default (config: Config) => {
  return async () => {
    const attributesCollection = (await config.db).collection(PERSONA_ATTRIBUTES_COLLECTION);
    const identCollection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

    /* tslint:disable:object-literal-sort-keys */
    await identCollection.createIndex({
      organisation: 1,
      persona: 1,
    }, { background: true});
    /* tslint:enable:object-literal-sort-keys */

    /* tslint:disable:object-literal-sort-keys */
    await identCollection.createIndex({
      organisation: 1,
      ifi: 1,
    }, { unique: true, background: true});
    /* tslint:enable:object-literal-sort-keys */

    /* tslint:disable:object-literal-sort-keys */
    await attributesCollection.createIndex({
      organisation: 1,
      personaId: 1,
      key: 1,
    }, { background: true});
    /* tslint:enable:object-literal-sort-keys */
  };
};
