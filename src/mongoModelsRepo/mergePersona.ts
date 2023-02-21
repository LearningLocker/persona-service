import { ObjectID } from 'mongodb';
import type MergePersonaOptions from '../repoFactory/options/MergePersonaOptions';
import type MergePersonaResult from '../repoFactory/results/MergePersonaResult';
import type Config from './Config';
import {
  PERSONA_ATTRIBUTES_COLLECTION,
  PERSONA_IDENTIFIERS_COLLECTION,
} from './utils/constants/collections';

export default (config: Config) => {
  return async (opts: MergePersonaOptions): Promise<MergePersonaResult> => {
    const db = await config.db;
    const personaIdentifiersCollection = db.collection(PERSONA_IDENTIFIERS_COLLECTION);
    const personaAttributesCollection = db.collection(PERSONA_ATTRIBUTES_COLLECTION);

    const identFilter = {
      organisation: new ObjectID(opts.organisation),
      persona: new ObjectID(opts.fromPersonaId),
    };

    const toMaybeUpdateIdentifierIds = (
      await personaIdentifiersCollection.find(identFilter).toArray()
    ).map(({ _id }) => _id.toString());

    const identUpdate = {
      $set: { persona: new ObjectID(opts.toPersonaId) },
    };

    const attributeFilter = {
      organisation: new ObjectID(opts.organisation),
      personaId: new ObjectID(opts.fromPersonaId),
    };

    const toMaybeUpdateAttributeIds = (
      await personaAttributesCollection.find(attributeFilter).toArray()
    ).map(({ _id }) => _id.toString());

    const attributeUpdate = {
      $set: { personaId: new ObjectID(opts.toPersonaId) },
    };

    await personaIdentifiersCollection.updateMany(identFilter, identUpdate);
    await personaAttributesCollection.updateMany(attributeFilter, attributeUpdate);

    return { identifierIds: toMaybeUpdateIdentifierIds, attributeIds: toMaybeUpdateAttributeIds };
  };
};
