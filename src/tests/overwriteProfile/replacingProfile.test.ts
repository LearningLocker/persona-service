import assertProfile from '../utils/assertProfile';
import createImmutableProfile from '../utils/createImmutableProfile';
import setup from '../utils/setup';
import { TEST_CONTENT, TEST_MBOX_AGENT } from '../utils/values';
import overwriteProfile from './utils/overwriteProfile';

describe('overwriteProfile replacing profiles', () => {
  setup();

  it('should overwrite model when overwriting an existing model', async () => {
    // Creates model with initial content.
    const initialContent = 'initial_dummy_content';
    await overwriteProfile(TEST_MBOX_AGENT, initialContent);

    // Overwrites model with expected content.
    await overwriteProfile(TEST_MBOX_AGENT, TEST_CONTENT);
    await assertProfile(TEST_MBOX_AGENT, TEST_CONTENT);
  });

  it('should not overwrite existing models when using a non-existing model', async () => {
    await createImmutableProfile();
    await overwriteProfile(TEST_MBOX_AGENT, TEST_CONTENT);
    await assertProfile(TEST_MBOX_AGENT, TEST_CONTENT);
  });
});
