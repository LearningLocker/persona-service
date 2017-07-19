import * as stringToStream from 'string-to-stream';
import ClientModel from '../../models/ClientModel';
import service from '../../tester';
import {
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../utils/values';

export default async (client: ClientModel) => {
  await service.overwriteProfile({
    agent: TEST_MBOX_AGENT,
    client,
    content: stringToStream(TEST_CONTENT),
    contentType: TEXT_CONTENT_TYPE,
    profileId: TEST_PROFILE_ID,
  });
};
