import DuplicateMergeId from '../errors/DuplicateMergeId';
import MissingMergeFromPersona from '../errors/MissingMergeFromPersona';
import MissingMergeToPersona from '../errors/MissingMergeToPersona';
import NoModelWithId from '../errors/NoModelWithId';
import MergePersonaOptions from '../serviceFactory/options/MergePersonaOptions';
import MergePersonaResult from '../serviceFactory/results/MergePersonaResult';
import Config from './Config';

export default (config: Config) => async ({
  fromPersonaId,
  organisation,
  toPersonaId,
}: MergePersonaOptions): Promise<MergePersonaResult> => {
  if (fromPersonaId === toPersonaId) {
    throw new DuplicateMergeId(fromPersonaId);
  }
  try {
    await Promise.all([
      config.repo.getPersona({ personaId: fromPersonaId, organisation }),
      config.repo.getPersona({ personaId: toPersonaId, organisation }),
    ]);
  } catch (err) {
    /* istanbul ignore else */
    if (err instanceof NoModelWithId) {
      if (err.id === fromPersonaId) {
        throw new MissingMergeFromPersona(err.modelName, err.id);
      }
      /* istanbul ignore else */
      if (err.id === toPersonaId) {
        throw new MissingMergeToPersona(err.modelName, err.id);
      }
    }
    /* istanbul ignore next */
    throw err;
  }

  // Do the merge
  const { identifierIds } = await config.repo.mergePersona({
    fromPersonaId,
    organisation,
    toPersonaId,
  });

  await config.repo.deletePersona({
    organisation,
    personaId: fromPersonaId,
  });

  return { identifierIds };
};
