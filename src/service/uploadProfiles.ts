import { map } from 'lodash';
import ClientModel from '../models/ClientModel';
import UploadProfilesOptions from '../serviceFactory/options/UploadProfilesOptions';
import UploadProfilesResult from '../serviceFactory/results/UploadProfilesResult';
import Config from './Config';
import createEtag from './utils/createEtag';
import getIfiFromAgent from './utils/getIfiFromAgent';
import getPersonaIdFromIdentifier from './utils/getPersonaIdFromIdentifier';

interface AddProfilesToIdentifiersOptions {
  readonly client: ClientModel;
  readonly config: Config;
  readonly identifierIds: string[];
  readonly profiles: {[key: string]: any};
}
const addProfilesToIdentifiers = async ({
  client,
  config,
  identifierIds,
  profiles,
}: AddProfilesToIdentifiersOptions) => {

  return Promise.all(
    identifierIds.map(async (identifierId) => {
      return Promise.all(
        map(profiles, (profile: string, profileKey: string) => {
          return config.repo.overwriteProfile({
            client,
            content: profile,
            contentType: 'application/json',
            etag: createEtag(),
            personaIdentifier: identifierId,
            profileId: profileKey,
          });
        }),
      );
    }),
  );
};

export default (config: Config) => async ({
  client,
  profiles,
  primaryAgent,
  secondaryAgents,
}: UploadProfilesOptions): Promise<UploadProfilesResult> => {

  const primaryIfi = getIfiFromAgent(primaryAgent);
  const ifis = secondaryAgents.map(getIfiFromAgent);

  const {
    identifier: primaryIdentifier,
    wasCreated: primaryWasCreated,
  } = await config.repo.createIdentifier({
    client,
    ifi: primaryIfi,
  });

  const personaId = await getPersonaIdFromIdentifier({
    client,
    config,
    identifier: primaryIdentifier,
    wasCreated: primaryWasCreated,
  });

  const secondaryIdentifierIds =
    (await Promise.all(
      ifis.map((ifi) => {
        return config.repo.overwriteIdentifier({
          client,
          ifi,
          personaId,
        });
      }),
    )).map(({ identifier: {id} }) => id );
  // Const {identifiersCreationResult} = await config.repo.overwriteIdentifiers({
  //   Client,
  //   Ifis,
  //   PersonaId,
  // });

  // Return created and found identifier ids
  const identifierIds = [
    primaryIdentifier.id,
    ...secondaryIdentifierIds,
  ];

  // Add profile to Identifiers
  await addProfilesToIdentifiers({
    client,
    config,
    identifierIds,
    profiles,
  });

  return { identifierIds };
};
