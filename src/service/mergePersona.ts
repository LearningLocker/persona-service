import DuplicateMergeId from '../errors/DuplicateMergeId';
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
  await Promise.all([
    config.repo.getPersona({personaId: fromPersonaId, client}),
    config.repo.getPersona({personaId: toPersonaId, client}),
  ]);

  // Do the merge

  await config.repo.deletePersona({ personaId: fromPersonaId });

  return {identifierIds: []};
};
