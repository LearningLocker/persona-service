import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import IfMatch from '../../errors/IfMatch';
import IfNoneMatch from '../../errors/IfNoneMatch';
import MaxEtags from '../../errors/MaxEtags';
import setup from '../utils/setup';
import {
  JSON_CONTENT_TYPE,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
} from '../utils/values';

interface EtagOptions {
  ifMatch?: string;
  ifNoneMatch?: string;
}

describe('patchProfile with etags', () => {
  const service = setup();

  const createProfile = async () => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_OBJECT_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
  };

  const patchProfileWithEtag = async ({ ifMatch, ifNoneMatch }: EtagOptions) => {
    await service.patchProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_OBJECT_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      ifMatch,
      ifNoneMatch,
      profileId: TEST_PROFILE_ID,
    });
  };

  it('should allow patches when using a correct etag', async () => {
    await createProfile();
    const getProfileResult = await service.getProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });
    await patchProfileWithEtag({ ifMatch: getProfileResult.etag });
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createProfile();
    const promise = patchProfileWithEtag({ ifMatch: 'incorrect_etag' });
    await assertError(IfMatch, promise);
  });

  it('should throw precondition error when using an incorrect ifNoneMatch', async () => {
    await createProfile();
    const promise = patchProfileWithEtag({ ifNoneMatch: '*' });
    await assertError(IfNoneMatch, promise);
  });

  it('should allow patch when not using an ifMatch or ifNoneMatch', async () => {
    await createProfile();
    await patchProfileWithEtag({});
  });

  it('should throw max etag error when using ifMatch and ifNoneMatch', async () => {
    await createProfile();
    const promise = patchProfileWithEtag({ ifMatch: 'incorrect_etag', ifNoneMatch: '*' });
    await assertError(MaxEtags, promise);
  });
});
