import * as stringToStream from 'string-to-stream';
import ClientModel from '../../models/ClientModel';
import assertProfile from '../utils/assertProfile';
import setup from '../utils/setup';
import {
  JSON_CONTENT_TYPE,
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
} from '../utils/values';
import patchContent from './utils/patchContent';

describe('patchProfile when outside client', () => {
  const service = setup();

  const patchOutsideProfile = async (client: ClientModel) => {
    await service.patchProfile({
      agent: TEST_MBOX_AGENT,
      client,
      content: stringToStream('{"bar":2}'),
      contentType: JSON_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await patchOutsideProfile(TEST_CLIENT_OUTSIDE_ORG);
    await assertProfile(TEST_MBOX_AGENT, TEST_OBJECT_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await patchOutsideProfile(TEST_CLIENT_OUTSIDE_STORE);
    await assertProfile(TEST_MBOX_AGENT, TEST_OBJECT_CONTENT);
  });
});
