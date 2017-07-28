import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import DuplicateMergeId from '../../errors/DuplicateMergeId';
import NoModelWithId from '../../errors/NoModelWithId';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import { TEST_CLIENT, TEST_IFI } from '../utils/values';

describe('mergePersona with existing personas', () => {
  const service = setup();

  it('Should delete from persona when using two existing personas', async () => {
    const fromPersona = await createTestPersona();
    const toPersona = await createTestPersona();
    await service.mergePersona({
      client: TEST_CLIENT,
      fromPersonaId: fromPersona.id,
      toPersonaId: toPersona.id,
    });
    const promise = service.getPersona({
      client: TEST_CLIENT,
      personaId: fromPersona.id,
    });
    await assertError(NoModelWithId, promise);
  });

  it('Should not merge if the two ids are the same', async () => {
    const thePersona = await createTestPersona();

    const promise = service.mergePersona({
      client: TEST_CLIENT,
      fromPersonaId: thePersona.id,
      toPersonaId: thePersona.id,
    });

    await assertError(DuplicateMergeId, promise);
  });

  it('Should add the persona from the merge source', async () => {

    const fromPersona = await createTestPersona();

    const {identifier: fromIdentifier} = await service.createIdentifier({
      client: TEST_CLIENT,
      ifi: TEST_IFI,
      persona: fromPersona.id,
    });

    const toPersona = await createTestPersona();

    const {identifierIds} = await service.mergePersona({
      client: TEST_CLIENT,
      fromPersonaId: fromPersona.id,
      toPersonaId: toPersona.id,
    });

    // Assert identifiers points to the toPersona
    const {identifier: resultIdentifier} = await service.getIdentifier({
      client: TEST_CLIENT,
      id: fromIdentifier.id,
    });
    assert.equal(resultIdentifier.persona, toPersona.id);

    assert.deepEqual(identifierIds, [resultIdentifier.id]);
  });

  it('Should keep identifiers that already exist on the merge target', async () => {
    const sourcePersona = await createTestPersona();
    const targetPersona = await createTestPersona();
    const {identifier: existingIdentifier} = await service.createIdentifier({
      client: TEST_CLIENT,
      ifi: TEST_IFI,
      persona: targetPersona.id,
    });
    const {identifierIds} = await service.mergePersona({
      client: TEST_CLIENT,
      fromPersonaId: sourcePersona.id,
      toPersonaId: targetPersona.id,
    });
    const {identifier: resultIdentifier} = await service.getIdentifier({
      client: TEST_CLIENT,
      id: existingIdentifier.id,
    });
    assert.equal(resultIdentifier.persona, targetPersona.id);
    assert.deepEqual(identifierIds, []);
  });
});
