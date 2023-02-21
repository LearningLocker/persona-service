import * as assert from 'assert';
import createTestIdentifier from '../utils/createTestIdentifier';
import setup from '../utils/setup';
import { TEST_IFI, TEST_ORGANISATION, TEST_ORGANISATION_OUTSIDE_STORE } from '../utils/values';

describe('getIfisByPersona', () => {
  const service = setup();

  it('should get the ifis for the persona', async () => {
    const {personaId} = await createTestIdentifier();

    const result = await service.getIfisByPersona({
      organisation: TEST_ORGANISATION,
      persona: personaId,
    });

    assert.deepEqual(result.ifis[0], TEST_IFI);
  });

  it('should return nothing if outside organisation', async () => {
    const { personaId } = await createTestIdentifier();

    const result = await service.getIfisByPersona({
      organisation: TEST_ORGANISATION_OUTSIDE_STORE,
      persona: personaId,
    });

    assert.equal(result.ifis.length, 0);
  });
});
