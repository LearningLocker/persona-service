import { v4 as uuid } from 'uuid';
import ClientModel from '../../models/ClientModel';
import Profile from '../../models/Profile';
import Config from '../Config';

interface Options {
  content: any;
  contentType: string;
  personaIdentifier: string;
  profileId: string;
  client: ClientModel;
}

export default (config: Config, opts: Options): Profile => {
  const profile: Profile = {
    content: opts.content,
    contentType: opts.contentType,
    id: uuid(),
    lrs: opts.client.lrs_id,
    organisation: opts.client.organisation,
    personaIdentifier: opts.personaIdentifier,
    profileId: opts.profileId,
    updatedAt: new Date(),
  };
  config.state.agentProfiles = [
    ...config.state.agentProfiles,
    profile,
  ];
  return profile;
};
