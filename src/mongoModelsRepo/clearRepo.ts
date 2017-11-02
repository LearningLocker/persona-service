import Config from './Config';

export default (config: Config) => {
  return async (): Promise<void> => {
    const db = await config.db;
    const personasCollection = db.collection('personas');
    const personaIdentifiersCollection = db.collection('personaIdentifiers');
    const personaAttributesCollection = db.collection('personaAttributes');

    await Promise.all([
      personasCollection.deleteMany({}),
      personaIdentifiersCollection.deleteMany({}),
      personaAttributesCollection.deleteMany({}),
    ]);
  };
};
