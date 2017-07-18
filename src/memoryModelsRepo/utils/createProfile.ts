import { v4 as uuid } from 'uuid';
import Profile from '../../models/Profile';
import Config from '../Config';

interface Options {
  content: any;
  contentType: string;
  personaIdentifier: string;
  profileId: string;
}

export default (config: Config, opts: Options) => {
  const profile: Profile = {
    content: opts.content,
    contentType: opts.contentType,
    id: uuid(),
    organisation: '',
    personaIdentifier: opts.personaIdentifier,
    profileId: opts.profileId,
  };
  config.state.agentProfiles = [
    ...config.state.agentProfiles,
    profile,
  ];
};
