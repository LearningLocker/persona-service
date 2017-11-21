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

    const {identifier: newIdentifier} = await service.updateIdentifier({
      id: identifier.id,
      ifi: {
        key: 'mbox',
        value: 'test2@test2.com',
      },
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    assert.equal(newIdentifier.ifi.value, 'test2@test2.com');

    const {identifier: actualIdentifier} = await service.getIdentifier({
      id: identifier.id,
      organisation: TEST_ORGANISATION,
    });

    assert.deepEqual(newIdentifier, actualIdentifier);
  });

  it('should throw error if no model found', () => {
    const updatePromise = service.updateIdentifier({
      id: '58fe11e24effd3c35a7fc4b8',
      ifi: {
        key: 'mbox',
        value: 'test@test.com',
      },
      organisation: TEST_ORGANISATION,
    });

    return assertError(NoModelWithId, updatePromise);
  });
});
