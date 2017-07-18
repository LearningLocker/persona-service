import service from '../../../tester';
import { TEST_CLIENT, TEST_PROFILE_ID } from '../../utils/values';

export default async (agent: any) => {
  await service.deleteProfile({
    agent,
    client: TEST_CLIENT,
    profileId: TEST_PROFILE_ID,
  });
};
