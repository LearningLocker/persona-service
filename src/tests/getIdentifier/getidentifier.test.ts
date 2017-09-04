import * as assert from 'assert';
import repoFactory from '../../repoFactory';
import service from '../../service';
import {
  TEST_IFI,
  TEST_ORGANISATION,
} from '../utils/values';

describe('getIdentifier', () => {

  it('getIdentifier with no persona', async () => {
    const repoFacade = repoFactory();
    const config = {repo: repoFacade};
    await config.repo.clearRepo();
    const theService = service(config);

    const {identifier} = await config.repo.createIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
    });

    const {identifier: identifierResult} = await theService.getIdentifier({
      id: identifier.id,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(identifierResult.persona, undefined);
  });
});
