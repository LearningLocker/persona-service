import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import service from '../../../tester';
import { TEST_CLIENT, TEST_MBOX_AGENT, TEST_PROFILE_ID } from '../../utils/values';

export default async () => {
  const promise = service.deleteProfile({
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    profileId: TEST_PROFILE_ID,
  });
  await assertError(NoModel, promise);
};
