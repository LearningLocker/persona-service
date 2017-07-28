import DuplicateMergeId from '../errors/DuplicateMergeId';
import MissingMergeFromPersona from '../errors/MissingMergeFromPersona';
import MissingMergeToPersona from '../errors/MissingMergeToPersona';
import NoModelWithId from '../errors/NoModelWithId';
import MergePersonaOptions from '../serviceFactory/options/MergePersonaOptions';
import MergePersonaResult from '../serviceFactory/results/MergePersonaResult';
import Config from './Config';

export default (config: Config) => async ({
  client,
  fromPersonaId,
  toPersonaId,
}: MergePersonaOptions): Promise<MergePersonaResult> => {
  if (fromPersonaId === toPersonaId) {
    throw new DuplicateMergeId(fromPersonaId);
  }
  try {
    await Promise.all([
      config.repo.getPersona({personaId: fromPersonaId, client}),
      config.repo.getPersona({personaId: toPersonaId, client}),
    ]);
  } catch (err) {
    if (err instanceof NoModelWithId) {
      if (err.id === fromPersonaId) {
        throw new MissingMergeFromPersona(err.modelName, err.id);
      }
      if (err.id === toPersonaId) {
        throw new MissingMergeToPersona(err.modelName, err.id);
      }
    }
    throw err;
  }

  // Do the merge
  const { identifierIds } = await config.repo.mergePersona({
    fromPersonaId,
    organisation: client.organisation,
    toPersonaId,
  });

  await config.repo.deletePersona({
    organisation: client.organisation,
    personaId: fromPersonaId,
  });

  return { identifierIds };
};
