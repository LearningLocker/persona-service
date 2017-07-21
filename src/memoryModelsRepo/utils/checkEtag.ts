import IfMatch from '../../errors/IfMatch';
import IfNoneMatch from '../../errors/IfNoneMatch';
import Profile from '../../models/Profile';

interface Options {
  profile: Profile;
  ifMatch?: string;
  ifNoneMatch?: string;
}

export default ({ profile, ifMatch, ifNoneMatch }: Options) => {
  if (ifMatch !== undefined && profile.etag !== ifMatch) {
    throw new IfMatch();
  }

  if (ifNoneMatch !== undefined && ifNoneMatch === '*') {
    throw new IfNoneMatch();
  }
};
