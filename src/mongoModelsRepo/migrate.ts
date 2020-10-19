import Config from './Config';
import {
  PERSONA_ATTRIBUTES_COLLECTION,
  PERSONA_IDENTIFIERS_COLLECTION,
  PERSONAS_COLLECTION,
} from './utils/constants/collections';

export default (config: Config) => {
  return async () => {
    const db = await config.db;
    const personasCollection = db.collection(PERSONAS_COLLECTION);
    const attributesCollection = db.collection(PERSONA_ATTRIBUTES_COLLECTION);
    const identCollection = db.collection(PERSONA_IDENTIFIERS_COLLECTION);

    /* tslint:disable:object-literal-sort-keys */
    await personasCollection.createIndex({
      organisation: 1,
    }, { background: true});
    /* tslint:enable:object-literal-sort-keys */

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
