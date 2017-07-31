import UploadProfilesOptions from '../serviceFactory/options/UploadProfilesOptions';
import UploadProfilesResult from '../serviceFactory/results/UploadProfilesResult';
import Config from './Config';
import getIfiFromAgent from './utils/getIfiFromAgent';

export default (config: Config) => async ({
  client,
  agents,
  // Profiles,
}: UploadProfilesOptions): Promise<UploadProfilesResult> => {

  const ifis = agents.map(getIfiFromAgent);

  const {identifiersCreationResult} = await config.repo.createIdentifiers({
    client,
    ifis,
  });

  // Creates personas for newly created identifiers.
  await Promise.all(
    identifiersCreationResult.map(async (result) => {
      if (result.wasCreated) {
        const {persona} = await config.repo.createPersona({ client });
        await config.repo.setIdentifierPersona({
          id: result.identifier.id,
          persona: persona.id,
        });
      }
    }),
  );

  const identifierIds = identifiersCreationResult.map(({identifier}) => identifier.id);

  return { identifierIds };
};
