import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import * as stringToStream from 'string-to-stream';
import NonJsonObject from '../../errors/NonJsonObject';
import assertProfile from '../utils/assertProfile';
import createImmutableProfile from '../utils/createImmutableProfile';
import setup from '../utils/setup';
import {
  JSON_CONTENT_TYPE,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_INVALID_AGENT,
  TEST_JSON_CONTENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../utils/values';
import patchContent from './utils/patchContent';

describe('patchProfile with new content', () => {
  const service = setup();

  it('should error when patching with text content', async () => {
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with JSON content', async () => {
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should create when patching with object content', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await assertProfile(TEST_MBOX_AGENT, TEST_OBJECT_CONTENT);
  });

  it('should not patch existing models when patching a non-existing model', async () => {
    await createImmutableProfile();
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await assertProfile(TEST_MBOX_AGENT, TEST_OBJECT_CONTENT);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = service.patchProfile({
      agent: TEST_INVALID_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
    await assertError(Warnings, promise);
  });
});
