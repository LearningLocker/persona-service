import ClientModel from '../../models/ClientModel';
import Profile from '../../models/Profile';

interface Options {
  client: ClientModel;
  personaIdentifier: string;
  profile: Profile;
}

export default ({ client, personaIdentifier, profile }: Options) => {
  return (
    profile.organisation === client.organisation &&
    profile.lrs === client.lrs_id &&
    profile.personaIdentifier === personaIdentifier
  );
};
