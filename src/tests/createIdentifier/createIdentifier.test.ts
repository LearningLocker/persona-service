import * as assert from 'assert';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import {
  TEST_ACCOUNT_IFI,
  TEST_IFI,
  TEST_ORGANISATION,
  TEST_ORGANISATION_OUTSIDE_STORE,
} from '../utils/values';

describe('createIdentifier', () => {
  const service = setup();

  it('Should create identifier', async () => {
    const persona = await createTestPersona();
    const {identifier, wasCreated} = await service.createIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });
    const {identifier: actualIdentifier} = await service.getIdentifier({
      id: identifier.id,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(wasCreated, true);
    assert.equal(actualIdentifier.id, identifier.id);
    assert.deepEqual(actualIdentifier.ifi, TEST_IFI);
    assert.equal(actualIdentifier.organisation, TEST_ORGANISATION);
    assert.equal(actualIdentifier.persona, persona.id);
  });

  it('Should update an identidier', async () => {
    const persona = await createTestPersona();

    await service.createIdentifier({
      ifi: TEST_ACCOUNT_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    const {wasCreated} = await service.createIdentifier({
      ifi: TEST_ACCOUNT_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    assert.equal(wasCreated, false);
  });

  it('Should create identifiers in different organisations', async () => {
    const persona = await createTestPersona();

      await service.createIdentifier({
        ifi: TEST_IFI,
        organisation: TEST_ORGANISATION,
        persona: persona.id,
      });

      const {wasCreated} = await service.createIdentifier({
        ifi: TEST_IFI,
        organisation: TEST_ORGANISATION_OUTSIDE_STORE,
        persona: persona.id,
      });

      assert.equal(wasCreated, true);
  });
});
