import NoModel from 'jscommons/dist/errors/NoModel';
import DuplicateMergeId from '../errors/DuplicateMergeId';
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
    await config.repo.getPersona({ personaId: toPersonaId, organisation });
  } catch (err) {
    if (err instanceof NoModelWithId) {
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

  try {
    await config.repo.deletePersona({
      organisation,
      personaId: fromPersonaId,
    });
  } catch (err) {
    if (err instanceof NoModel) {
      // potentially expected, if persona was removed by another process during this exchange
    }
    throw err;
  }

  return { identifierIds };
};
