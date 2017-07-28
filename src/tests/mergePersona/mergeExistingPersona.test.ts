import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import DuplicateMergeId from '../../errors/DuplicateMergeId';
import NoModelWithId from '../../errors/NoModelWithId';
import Ifi from '../../models/Ifi';
import setup from '../utils/setup';
import { TEST_CLIENT } from '../utils/values';
import createTestPersona from './utils/createTestPersona';

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

  it('Should add the persona from the from persona', async () => {

    const fromPersona = await createTestPersona();

    const fromIfi: Ifi = {
      key: 'mbox',
      value: 'test@test.com',
    };

    const {identifier: fromIdentifier} = await service.createIdentifier({
      client: TEST_CLIENT,
      ifi: fromIfi,
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
});
