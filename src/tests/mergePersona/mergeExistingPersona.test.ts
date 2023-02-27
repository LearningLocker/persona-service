import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import DuplicateMergeId from '../../errors/DuplicateMergeId';
import NoModelWithId from '../../errors/NoModelWithId';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import { TEST_IFI, TEST_ORGANISATION } from '../utils/values';

describe('mergePersona with existing personas', () => {
  const service = setup();

  it('Should delete from persona when using two existing personas', async () => {
    const fromPersona = await createTestPersona();
    const toPersona = await createTestPersona();
    await service.mergePersona({
      fromPersonaId: fromPersona.id,
      organisation: TEST_ORGANISATION,
      toPersonaId: toPersona.id,
    });
    const promise = service.getPersona({
      organisation: TEST_ORGANISATION,
      personaId: fromPersona.id,
    });
    await assertError(NoModelWithId, promise);
  });

  it('Should not merge if the two ids are the same', async () => {
    const thePersona = await createTestPersona();

    const promise = service.mergePersona({
      fromPersonaId: thePersona.id,
      organisation: TEST_ORGANISATION,
      toPersonaId: thePersona.id,
    });

    await assertError(DuplicateMergeId, promise);
  });

  it('Should add the persona from the merge source', async () => {
    const fromPersona = await createTestPersona();

    const { identifier: fromIdentifier } = await service.createIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      persona: fromPersona.id,
    });

    const attribute1 = {
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId: fromPersona.id,
      value: 'theValue1',
    };

    const { attribute: fromAttribute } = await service.overwritePersonaAttribute(attribute1);

    const toPersona = await createTestPersona();

    const { identifierIds } = await service.mergePersona({
      fromPersonaId: fromPersona.id,
      organisation: TEST_ORGANISATION,
      toPersonaId: toPersona.id,
    });

    // Assert identifiers points to the toPersona
    const { identifier: resultIdentifier } = await service.getIdentifier({
      id: fromIdentifier.id,
      organisation: TEST_ORGANISATION,
    });
    assert.equal(resultIdentifier.persona, toPersona.id);

    // Assert identifiers points to the toPersona
    const { attribute: resultAttribute } = await service.getAttribute({
      id: fromAttribute.id,
      organisation: TEST_ORGANISATION,
    });
    assert.equal(resultAttribute.personaId, toPersona.id);

    assert.deepEqual(identifierIds, [resultIdentifier.id]);
  });

  it('Should keep identifiers that already exist on the merge target', async () => {
    const sourcePersona = await createTestPersona();
    const targetPersona = await createTestPersona();
    const { identifier: existingIdentifier } = await service.createIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      persona: targetPersona.id,
    });
    const { identifierIds } = await service.mergePersona({
      fromPersonaId: sourcePersona.id,
      organisation: TEST_ORGANISATION,
      toPersonaId: targetPersona.id,
    });
    const { identifier: resultIdentifier } = await service.getIdentifier({
      id: existingIdentifier.id,
      organisation: TEST_ORGANISATION,
    });
    assert.equal(resultIdentifier.persona, targetPersona.id);
    assert.deepEqual(identifierIds, []);
  });
});
