import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import assertProfile from '../utils/assertProfile';
import setup from '../utils/setup';
import {
  JSON_CONTENT_TYPE,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../utils/values';
import patchContent from './utils/patchContent';

describe('patchProfile with existing object content', () => {
  const service = setup();

  const createObjectContent = async () => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_OBJECT_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
  };

  it('should error when patching with text content', async () => {
    await createObjectContent();
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(Error, promise);
  });

  it('should error when patching with JSON content', async () => {
    await createObjectContent();
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(Error, promise);
  });

  it('should merge when patching with object content', async () => {
    await createObjectContent();
    await patchContent('{"bar": 2}', JSON_CONTENT_TYPE);
    await assertProfile(TEST_MBOX_AGENT, '{"foo":1,"bar":2}');
  });
});
