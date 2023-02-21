import * as assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import createTestIdentifier from '../utils/createTestIdentifier';
import setup from '../utils/setup';
import { TEST_IFI, TEST_ORGANISATION } from '../utils/values';

describe('getIdentifierByIfi', () => {
  const service = setup();

  it('Should get the identifier by ifi', async () => {
    const { personaId } = await createTestIdentifier();

    const { personaId: actualPersonaId } = await service.getIdentifierByIfi({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(personaId, actualPersonaId);
  });

  it('Should throw an exception if no model', async () => {
    const resultPromise = service.getIdentifierByIfi({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
    });

    await assertError(NoModel, resultPromise);
  });
});
