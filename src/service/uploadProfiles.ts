import { map } from 'lodash';
import UploadProfilesOptions from '../serviceFactory/options/UploadProfilesOptions';
import UploadProfilesResult from '../serviceFactory/results/UploadProfilesResult';
import Config from './Config';
import getPersonaIdFromIdentifier from './utils/getPersonaIdFromIdentifier';

interface AddProfilesToIdentifiersOptions {
  readonly organisation: string;
  readonly config: Config;
  readonly identifierIds: string[];
  readonly profiles: {
    readonly [key: string]: any;
  };
}
const addProfilesToIdentifiers = async ({
  organisation,
  config,
  identifierIds,
  profiles,
}: AddProfilesToIdentifiersOptions) => {

  return Promise.all(
    identifierIds.map(async (identifierId) => {
      return Promise.all(
        map(profiles, (profile: string, profileKey: string) => {
          return config.repo.overwriteProfile({
            organisation,
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
  organisation,
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
    organisation,
    ifi: primaryIfi,
  });

  const personaId = await getPersonaIdFromIdentifier({
    organisation,
    config,
    identifier: primaryIdentifier,
    wasCreated: primaryWasCreated,
  });

  const secondaryIdentifierIds =
    (await Promise.all(
      ifis.map((ifi) => {
        return config.repo.overwriteIdentifier({
          organisation,
          ifi,
          personaId,
        });
      }),
    )).map(({ identifier: {id} }) => id );

  // Return created and found identifier ids
  const identifierIds = [
    primaryIdentifier.id,
    ...secondaryIdentifierIds,
  ];

  // Add profile to Identifiers
  await addProfilesToIdentifiers({
    organisation,
    config,
    identifierIds,
    profiles,
  });

  return { identifierIds };
};
