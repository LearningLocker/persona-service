import ClientModel from '../../models/ClientModel';
import Profile from '../../models/Profile';
import matchProfileIdentifier from './matchProfileIdentifier';

interface Options {
  readonly client: ClientModel;
  readonly personaIdentifier: string;
  readonly profile: Profile;
  readonly profileId: string;
}

export default ({ client, personaIdentifier, profile, profileId }: Options) => {
  return (
    matchProfileIdentifier({ client, personaIdentifier, profile }) &&
    profile.profileId === profileId
  );
};
