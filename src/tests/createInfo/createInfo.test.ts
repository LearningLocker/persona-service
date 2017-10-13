import * as assert from 'assert';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
} from '../utils/values';

describe('createInfo', () => {
  const service = setup();

  it('should create info', async () => {
    // Setup
    await service.createUpdateIdentifierPersona({
      ifi: {
        key: 'mbox',
        value: 'test@test.com',
      },
      organisation: TEST_ORGANISATION,
      personaName: 'Test',
    });

  });
});
