import overwriteProfileOutsideClient from '../utils/overwriteProfileOutsideClient';
import patchProfileOutsideClient from '../utils/patchProfileOutsideClient';
import setup from '../utils/setup';
import { TEST_CLIENT_OUTSIDE_STORE } from '../utils/values';
import assertOutsideClient from './utils/assertOutsideClient';

describe('getProfiles outside the store', () => {
  setup();

  it('should return no profile ids when getting a overwritten model', async () => {
    await overwriteProfileOutsideClient(TEST_CLIENT_OUTSIDE_STORE);
    await assertOutsideClient();
  });

  it('should return no profile ids when getting a patched model', async () => {
    await patchProfileOutsideClient(TEST_CLIENT_OUTSIDE_STORE);
    await assertOutsideClient();
  });
});
