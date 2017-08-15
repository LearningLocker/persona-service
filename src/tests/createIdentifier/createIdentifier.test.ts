import * as assert from 'assert';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import { TEST_IFI, TEST_ORGANISATION } from '../utils/values';

describe('createIdentifier', () => {
  const service = setup();

  it('Should create identifier', async () => {
    const persona = await createTestPersona();
    const {identifier} = await service.createIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });
    const {identifier: actualIdentifier} = await service.getIdentifier({
      id: identifier.id,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(actualIdentifier.id, identifier.id);
    assert.deepEqual(actualIdentifier.ifi, TEST_IFI);
    assert.equal(actualIdentifier.organisation, TEST_ORGANISATION);
    assert.equal(actualIdentifier.persona, persona.id);
  });
});
