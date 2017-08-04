import { ObjectID } from 'mongodb';
import MergePersonaOptions from '../repoFactory/options/MergePersonaOptions';
import MergePersonaResult from '../repoFactory/results/MergePersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: MergePersonaOptions): Promise<MergePersonaResult> => {
    const personaIdentifiersCollection = (await config.db).collection('personaIdentifiers');

    const filter = {
      organisation: new ObjectID(opts.organisation),
      persona: new ObjectID(opts.fromPersonaId),
    };

    /* tslint:disable-next-line:deprecation - this find signature isn't deprecated */
    const toMaybeUpdateIdentifierIds = (await personaIdentifiersCollection.find(filter).toArray())
      .map(({_id}) => _id.toString());

    const update = {
      $set: {persona: new ObjectID(opts.toPersonaId)},
    };

    await personaIdentifiersCollection.updateMany(filter, update);

    return {identifierIds: toMaybeUpdateIdentifierIds};
  };
};
