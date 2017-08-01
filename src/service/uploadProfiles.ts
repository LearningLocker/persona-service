import { map } from 'lodash';
import { flatten } from 'lodash';
import ClientModel from '../models/ClientModel';
import Identifier from '../models/Identifier';
import UploadProfilesOptions from '../serviceFactory/options/UploadProfilesOptions';
import UploadProfilesResult from '../serviceFactory/results/UploadProfilesResult';
import Config from './Config';
import createEtag from './utils/createEtag';
import getIfiFromAgent from './utils/getIfiFromAgent';

export default (config: Config) => async ({
  client,
  agents,
  profiles,
}: UploadProfilesOptions): Promise<UploadProfilesResult> => {

  const ifis = agents.map(getIfiFromAgent);

  const {identifiersCreationResult} = await config.repo.createIdentifiers({
    client,
    ifis,
  });

  // Creates personas for newly created identifiers.
  await Promise.all(
    identifiersCreationResult.map(async ({wasCreated, identifier}) => {
      if (wasCreated === true) {
        const {persona} = await config.repo.createPersona({ client });
        await config.repo.setIdentifierPersona({
          id: identifier.id,
          persona: persona.id,
        });
      }
    }),
  );

  // Add profile to Identifiers
  await addProfilesToIdentifiers({
    client,
    config,
    identifiers: identifiersCreationResult.map(({identifier}) => identifier),
    profiles,
  });

  // Return created and found identifier ids
  const identifierIds = identifiersCreationResult.map(({identifier}) => identifier.id);

  return { identifierIds };
};

interface AddProfilesToIdentifiersOptions {
  readonly client: ClientModel;
  readonly config: Config;
  readonly identifiers: Identifier[];
  readonly profiles: {[key: string]: any};
}
const addProfilesToIdentifiers = async ({
  client,
  config,
  identifiers,
  profiles,
}: AddProfilesToIdentifiersOptions) => {

  // Delete all profiles for identifiers.
  const allProfileResults =
    await Promise.all(
      identifiers.map(async (identifier) => {
        const profilesResult = await config.repo.getProfiles({
          client,
          personaIdentifier: identifier.id,
        });

        return {
          identifierId: identifier.id,
          profileIds: profilesResult.profileIds,
        };
      }),
    );
  await Promise.all(
    allProfileResults.map(({identifierId, profileIds}) => {
      return profileIds.map((profileId: string) => {
        return config.repo.deleteProfile({
          client,
          personaIdentifier: identifierId,
          profileId,
        });
      });
    }),
  );

  return Promise.all(
    identifiers.map(async (identifier) => {
      return Promise.all(
        map(profiles, (profile: string, profileKey: string) => {
          return config.repo.overwriteProfile({
            client,
            content: profile,
            contentType: 'application/json',
            etag: createEtag(),
            personaIdentifier: identifier.id,
            profileId: profileKey,
          });
        }),
      );
    }),
  );
};
