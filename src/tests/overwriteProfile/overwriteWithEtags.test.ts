import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import Conflict from '../../errors/Conflict';
import IfMatch from '../../errors/IfMatch';
import IfNoneMatch from '../../errors/IfNoneMatch';
import MaxEtags from '../../errors/MaxEtags';
import createTextProfile from '../utils/createTextProfile';
import setup from '../utils/setup';
import {
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../utils/values';

interface EtagOptions {
  ifMatch?: string;
  ifNoneMatch?: string;
}

describe('overwriteProfile with etags', () => {
  const service = setup();

  const overwriteProfileWithEtag = async ({ ifMatch, ifNoneMatch }: EtagOptions) => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      ifMatch,
      ifNoneMatch,
      profileId: TEST_PROFILE_ID,
    });
  };

  it('should allow overwrites when using a correct etag', async () => {
    await createTextProfile();
    const getProfileResult = await service.getProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });
    await overwriteProfileWithEtag({ ifMatch: getProfileResult.etag });
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createTextProfile();
    const promise = overwriteProfileWithEtag({ ifMatch: 'incorrect_etag' });
    await assertError(IfMatch, promise);
  });

  it('should throw precondition error when using an incorrect ifNoneMatch', async () => {
    await createTextProfile();
    const promise = overwriteProfileWithEtag({ ifNoneMatch: '*' });
    await assertError(IfNoneMatch, promise);
  });

  it('should throw conflict error when not using ifMatch or ifNoneMatch', async () => {
    await createTextProfile();
    const promise = overwriteProfileWithEtag({});
    await assertError(Conflict, promise);
  });

  it('should throw max etag error when using ifMatch and ifNoneMatch', async () => {
    await createTextProfile();
    const promise = overwriteProfileWithEtag({ ifMatch: 'incorrect_etag', ifNoneMatch: '*' });
    await assertError(MaxEtags, promise);
  });
});
