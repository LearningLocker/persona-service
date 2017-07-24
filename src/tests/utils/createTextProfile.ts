import * as stringToStream from 'string-to-stream';
import service from '../../tester';
import {
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from './values';

export default async (agent: any = TEST_MBOX_AGENT) => {
  await service.overwriteProfile({
    agent,
    client: TEST_CLIENT,
    content: stringToStream(TEST_CONTENT),
    contentType: TEXT_CONTENT_TYPE,
    profileId: TEST_PROFILE_ID,
  });
};
