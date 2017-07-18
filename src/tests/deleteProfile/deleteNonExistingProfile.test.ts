import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import setup from '../utils/setup';
import { TEST_INVALID_AGENT, TEST_MBOX_AGENT } from '../utils/values';
import deleteProfile from './utils/deleteProfile';

describe('deleteProfile with non-existing profile', () => {
  setup();

  it('should error when deleting', async () => {
    const promise = deleteProfile(TEST_MBOX_AGENT);
    await assertError(NoModel, promise);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = deleteProfile(TEST_INVALID_AGENT);
    await assertError(Warnings, promise);
  });
});
