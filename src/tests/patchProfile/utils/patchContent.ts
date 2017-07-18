import * as stringToStream from 'string-to-stream';
import service from '../../../tester';
import {
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
} from '../../utils/values';

export default async (content: string, contentType: string) => {
  await service.patchProfile({
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    content: stringToStream(content),
    contentType,
    profileId: TEST_PROFILE_ID,
  });
};
