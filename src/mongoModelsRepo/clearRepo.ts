import Config from './Config';
import {
  PERSONAS_COLLECTION,
  PERSONA_ATTRIBUTES_COLLECTION,
  PERSONA_IDENTIFIERS_COLLECTION,
} from './utils/constants/collections';

export default (config: Config) => {
  return async (): Promise<void> => {
    const db = await config.db;
    const personasCollection = db.collection(PERSONAS_COLLECTION);
    const personaIdentifiersCollection = db.collection(PERSONA_IDENTIFIERS_COLLECTION);
    const personaAttributesCollection = db.collection(PERSONA_ATTRIBUTES_COLLECTION);

    await Promise.all([
      personasCollection.deleteMany({}),
      personaIdentifiersCollection.deleteMany({}),
      personaAttributesCollection.deleteMany({}),
    ]);
  };
};
