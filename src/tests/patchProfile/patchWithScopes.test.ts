import Forbidden from 'jscommons/dist/errors/Forbidden';
import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import { XAPI_PROFILE_ALL } from '../../utils/scopes';
import setup from '../utils/setup';
import {
  JSON_CONTENT_TYPE,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
} from '../utils/values';

describe('patchProfile with scopes', () => {
  const service = setup();

  it('should throw forbidden error when using invalid scope', async () => {
    const scopes = ['invalid_scope'];
    const promise = service.patchProfile({
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      content: stringToStream(TEST_OBJECT_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
    await assertError(Forbidden, promise);
  });

  it('should not throw an error when using valid scopes', async () => {
    const scopes = [XAPI_PROFILE_ALL];
    await service.patchProfile({
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      content: stringToStream(TEST_OBJECT_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
  });
});
