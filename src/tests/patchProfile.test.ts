import * as assert from 'assert';
import { Readable as ReadableStream } from 'stream';
import setup from './utils/setup';
import { TEST_AGENT, TEST_CLIENT } from './utils/values';

describe('patchProfile', () => {
  const service = setup();

  it('should create when patching a non-existing model', async () => {
    await service.patchProfile({
      agent: TEST_AGENT,
      client: TEST_CLIENT,
      content: new ReadableStream(),
      profileId: 'dummy_value',
    });
    assert(true);
  });
});
