import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import NonJsonObject from '../../errors/NonJsonObject';
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
import patchExistingContent from './utils/patchExistingContent';

describe('patchProfile with existing text content', () => {
  const service = setup();

  const createTextContent = async () => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
  };

  it('should error when patching with text content', async () => {
    await createTextContent();
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with JSON content', async () => {
    await createTextContent();
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with object content', async () => {
    await createTextContent();
    const promise = patchExistingContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });
});
