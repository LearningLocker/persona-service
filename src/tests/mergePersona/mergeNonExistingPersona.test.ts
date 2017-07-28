import assertError from 'jscommons/dist/tests/utils/assertError';
import MissingMergeFromPersona from '../../errors/MissingMergeFromPersona';
import MissingMergeToPersona from '../../errors/MissingMergeToPersona';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import { TEST_CLIENT } from '../utils/values';

const MISSING_ID = '58fa13b34effd3c26a9fc4b8';

describe('mergePersona with non-existing personas', () => {
  const service = setup();

  it('Should throw error if toModel does not exist', async () => {
    const persona = await createTestPersona();
    const promise = service.mergePersona({
      client: TEST_CLIENT,
      fromPersonaId: persona.id,
      toPersonaId: MISSING_ID,
    });
    await assertError(MissingMergeToPersona, promise);
  });

  it('Should throw error if fromModel does not exist', async () => {
    const persona = await createTestPersona();
    const promise = service.mergePersona({
      client: TEST_CLIENT,
      fromPersonaId: MISSING_ID,
      toPersonaId: persona.id,
    });
    await assertError(MissingMergeFromPersona, promise);
  });
});
