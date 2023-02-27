import * as assert from 'assert';
import repoFactory from '../../repoFactory';
import service from '../../service';
import {
  TEST_IFI,
  TEST_ORGANISATION,
} from '../utils/values';

describe('getIdentifier', () => {
  it('getIdentifier', async () => {
    const repoFacade = repoFactory();
    const config = { repo: repoFacade };
    await config.repo.clearRepo();
    const theService = service(config);

    const { identifier } = await config.repo.createUpdateIdentifierPersona({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Test',
    });

    const { identifier: identifierResult } = await theService.getIdentifier({
      id: identifier.id,
      organisation: TEST_ORGANISATION,
    });

    assert.notEqual(identifierResult.ifi, TEST_IFI);
  });
});
