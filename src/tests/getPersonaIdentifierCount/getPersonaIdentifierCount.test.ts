import * as assert from 'assert';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('getPersonaIdentifierConnectionCount', () => {
  const service = setup();

  it('should get identifiers count 0', async () => {
    const result = await service.getPersonaIdentifierCount({
      filter: {},
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.count, 0);
  });

  it('should get identifiers count', async () => {
    const { persona } = await service.createPersona({
      name: 'dave',
      organisation: TEST_ORGANISATION,
    });

    await service.createIdentifier({
      ifi: {
        key: 'mbox',
        value: 'test@test.com',
      },
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    const result = await service.getPersonaIdentifierCount({
      filter: {},
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.count, 1);
  });
});
