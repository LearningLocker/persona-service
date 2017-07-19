import ClientModel from '../../models/ClientModel';
import Profile from '../../models/Profile';
import matchProfileIdentifier from './matchProfileIdentifier';

interface Options {
  client: ClientModel;
  personaIdentifier: string;
  profile: Profile;
  profileId: string;
}

export default ({ client, personaIdentifier, profile, profileId }: Options) => {
  return (
    matchProfileIdentifier({ client, personaIdentifier, profile }) &&
    profile.profileId === profileId
  );
};
