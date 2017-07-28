import * as assert from 'assert';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import { TEST_CLIENT, TEST_IFI } from '../utils/values';

describe('createIdentifier', () => {
  const service = setup();

  it('Should create identifier', async () => {
    const persona = await createTestPersona();
    const {identifier} = await service.createIdentifier({
      client: TEST_CLIENT,
      ifi: TEST_IFI,
      persona: persona.id,
    });
    const {identifier: actualIdentifier} = await service.getIdentifier({
      client: TEST_CLIENT,
      id: identifier.id,
    });

    assert.equal(actualIdentifier.id, identifier.id);
    assert.deepEqual(actualIdentifier.ifi, TEST_IFI);
    assert.equal(actualIdentifier.organisation, TEST_CLIENT.organisation);
    assert.equal(actualIdentifier.persona, persona.id);
  });
});
