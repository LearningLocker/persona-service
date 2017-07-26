import { v4 as uuid } from 'uuid';
import ClientModel from '../../models/ClientModel';
import Profile from '../../models/Profile';
import Config from '../Config';

interface Options {
  readonly client: ClientModel;
  readonly content: any;
  readonly contentType: string;
  readonly etag: string;
  readonly personaIdentifier: string;
  readonly profileId: string;
}

export default (config: Config, opts: Options): Profile => {
  const profile: Profile = {
    content: opts.content,
    contentType: opts.contentType,
    etag: opts.etag,
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
