import * as assert from 'assert';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import {
  TEST_IFI,
  TEST_OPENID_IFI,
  TEST_ORGANISATION,
  TEST_ORGANISATION_OUTSIDE_STORE,
} from '../utils/values';

describe('overwriteIdentifier', () => {
  const service = setup();

  it('Should overwrite an identifier', async () => {
    const persona = await createTestPersona();

    const {persona: persona2} = await service.createPersona({
      name: 'Dave 2',
      organisation: TEST_ORGANISATION,
    });

    // should not be changed
    const {identifier: shouldBeSameIdentifier} = await service.createIdentifier({
      ifi: TEST_OPENID_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    const {identifier} = await service.createIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    const {wasCreated} = await service.overwriteIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona2.id,
    });

    const {identifier: actualIdentifier} = await service.getIdentifier({
      id: identifier.id,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(wasCreated, false);
    assert.deepEqual(actualIdentifier.persona, persona2.id);
    assert.equal(shouldBeSameIdentifier.persona, persona.id);
  });

  it('Should create on identifier if it does not exist', async () => {
    const persona = await createTestPersona('Dave', TEST_ORGANISATION_OUTSIDE_STORE);

    const {identifier, wasCreated} = await service.overwriteIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION_OUTSIDE_STORE,
      persona: persona.id,
    });

    const {identifier: actualIdentifier} = await service.getIdentifier({
      id: identifier.id,
      organisation: TEST_ORGANISATION_OUTSIDE_STORE,
    });

    assert.equal(wasCreated, true);
    assert.deepEqual(actualIdentifier.persona, persona.id);
  });
});
