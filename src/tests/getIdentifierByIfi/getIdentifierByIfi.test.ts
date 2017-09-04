import * as assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import repoFactory from '../../repoFactory';
import serviceFn from '../../service';
import createTestIdentifier from '../utils/createTestIdentifier';
import setup from '../utils/setup';
import { TEST_IFI, TEST_ORGANISATION } from '../utils/values';

describe('getIdentifierByIfi', () => {
  const service = setup();

  it('Should get the identifier by ifi', async () => {
    const { personaId } = await createTestIdentifier();

    const {personaId: actualPersonaId} = await service.getIdentifierByIfi({
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

    return assertError(NoModel, resultPromise);
  });

  it('get identifier with no persona', async () => {
    const repoFacade = repoFactory();
    const config = {repo: repoFacade};
    await config.repo.clearRepo();
    const theService = serviceFn(config);

    await config.repo.createIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
    });

    const {personaId} = await theService.getIdentifierByIfi({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(personaId, undefined);
  });
});
