import ClientModel from '../../models/ClientModel';
import Profile from '../../models/Profile';

interface Options {
  readonly client: ClientModel;
  readonly personaIdentifier: string;
  readonly profile: Profile;
}

export default ({ client, personaIdentifier, profile }: Options) => {
  return (
    profile.organisation === client.organisation &&
    profile.lrs === client.lrs_id &&
    profile.personaIdentifier === personaIdentifier
  );
};
