import EtagPrecondition from '../../errors/EtagPrecondition';
import Profile from '../../models/Profile';

interface Options {
  profile: Profile;
  ifMatch?: string;
  ifNoneMatch?: string;
}

export default ({ profile, ifMatch, ifNoneMatch }: Options) => {
  if (ifMatch !== undefined && profile.etag !== ifMatch) {
    throw new EtagPrecondition();
  }

  if (ifNoneMatch !== undefined && ifNoneMatch === '*') {
    throw new EtagPrecondition();
  }
};
