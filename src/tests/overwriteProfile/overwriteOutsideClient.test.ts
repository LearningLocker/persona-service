import * as stringToStream from 'string-to-stream';
import ClientModel from '../../models/ClientModel';
import assertProfile from '../utils/assertProfile';
import setup from '../utils/setup';
import {
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../utils/values';
import overwriteProfile from './utils/overwriteProfile';

describe('overwriteProfile when outside client', () => {
  const service = setup();

  const overwriteOutsideProfile = async (client: ClientModel) => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client,
      content: stringToStream('unused_content'),
      contentType: TEXT_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await overwriteProfile(TEST_MBOX_AGENT, TEST_CONTENT);
    await overwriteOutsideProfile(TEST_CLIENT_OUTSIDE_ORG);
    await assertProfile(TEST_MBOX_AGENT, TEST_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await overwriteProfile(TEST_MBOX_AGENT, TEST_CONTENT);
    await overwriteOutsideProfile(TEST_CLIENT_OUTSIDE_STORE);
    await assertProfile(TEST_MBOX_AGENT, TEST_CONTENT);
  });
});
