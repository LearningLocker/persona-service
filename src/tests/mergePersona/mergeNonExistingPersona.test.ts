import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import NoModelWithId from '../../errors/NoModelWithId';
import MergePersonaResult from '../../serviceFactory/results/MergePersonaResult';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import { TEST_CLIENT } from '../utils/values';

const MISSING_ID = '58fa13b34effd3c26a9fc4b8';

describe('mergePersona with non-existing personas', () => {
  const service = setup();

  const assertMissingPersona = async (promise: Promise<MergePersonaResult>) => {
    promise.catch((err) => {
      if (err instanceof NoModelWithId) {
        assert.equal(err.id, MISSING_ID);
      }
      assert.equal(err.constructor, NoModelWithId);
    });
  };

  it('Should throw a no model error', async () => {
    const result = service.mergePersona({
      client: TEST_CLIENT,
      fromPersonaId: MISSING_ID,
      toPersonaId: '58fa13f34effd4c36a9fc4b8',
    });
    await assertError(NoModelWithId, result);
  });

  it('Should throw no model error if fromModel does not exist', async () => {
    const persona = await createTestPersona();
    const promise = service.mergePersona({
      client: TEST_CLIENT,
      fromPersonaId: persona.id,
      toPersonaId: MISSING_ID,
    });
    await assertMissingPersona(promise);
  });

  it('Should throw no model error if toModel does not exist', async () => {
    const persona = await createTestPersona();
    const promise = service.mergePersona({
      client: TEST_CLIENT,
      fromPersonaId: MISSING_ID,
      toPersonaId: persona.id,
    });
    await assertMissingPersona(promise);
  });
});
