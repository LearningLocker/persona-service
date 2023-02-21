import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import NoModelWithId from '../../errors/NoModelWithId';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('updateIdentifier', () => {
  const service = setup();

  it('should update an identifier', async () => {
    const { persona } = await service.createPersona({
      name: 'Test 1',
      organisation: TEST_ORGANISATION,
    });

    const { identifier } = await service.createIdentifier({
      ifi: {
        key: 'mbox',
        value: 'test@test.com',
      },
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    const { identifier: newIdentifier } = await service.updateIdentifier({
      id: identifier.id,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    const { identifier: actualIdentifier } = await service.getIdentifier({
      id: identifier.id,
      organisation: TEST_ORGANISATION,
    });

    assert.deepEqual(newIdentifier, actualIdentifier);
  });

  it('should throw error if no model found', async () => {
    const updatePromise = service.updateIdentifier({
      id: '58fe11e24effd3c35a7fc4b8',
      organisation: TEST_ORGANISATION,
    });

    await assertError(NoModelWithId, updatePromise);
  });
});
