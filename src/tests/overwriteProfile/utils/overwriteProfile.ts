import * as stringToStream from 'string-to-stream';
import service from '../../../tester';
import { TEST_CLIENT, TEST_PROFILE_ID, TEXT_CONTENT_TYPE } from '../../utils/values';

export default async (agent: any, content: string) => {
  await service.overwriteProfile({
    agent,
    client: TEST_CLIENT,
    content: stringToStream(content),
    contentType: TEXT_CONTENT_TYPE,
    profileId: TEST_PROFILE_ID,
  });
};
