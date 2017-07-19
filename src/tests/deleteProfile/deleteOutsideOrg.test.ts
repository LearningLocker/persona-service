import overwriteProfileOutsideClient from '../utils/overwriteProfileOutsideClient';
import patchProfileOutsideClient from '../utils/patchProfileOutsideClient';
import setup from '../utils/setup';
import { TEST_CLIENT_OUTSIDE_ORG } from '../utils/values';
import assertOutsideClient from './utils/assertOutsideClient';

describe('deleteProfile outside the organisation', () => {
  setup();

  it('should error when deleting a overwritten model', async () => {
    await overwriteProfileOutsideClient(TEST_CLIENT_OUTSIDE_ORG);
    await assertOutsideClient();
  });

  it('should error when deleting a patched model', async () => {
    await patchProfileOutsideClient(TEST_CLIENT_OUTSIDE_ORG);
    await assertOutsideClient();
  });
});
