import assertError from 'jscommons/dist/tests/utils/assertError';
import createImmutableProfile from '../utils/createImmutableProfile';
import setup from '../utils/setup';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_OBJECT_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../utils/values';
import assertProfile from './utils/assertProfile';
import patchContent from './utils/patchContent';

describe('patchProfile with non-existing model', () => {
  setup();

  it('should error when patching with text content', async () => {
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(Error, promise);
  });

  it('should error when patching with JSON content', async () => {
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(Error, promise);
  });

  it('should create when patching with object content', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await assertProfile(TEST_OBJECT_CONTENT);
  });

  it('should not patch existing models when patching a non-existing model', async () => {
    // Creates existing models.
    await createImmutableProfile();

    // Creates a non-existing model.
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await assertProfile(TEST_OBJECT_CONTENT);
  });
});
