import * as assert from 'assert';
import repoFactory from '../../repoFactory';
import service from '../../service';
import {
  TEST_ORGANISATION,
} from '../utils/values';

describe('getAttribute', () => {
  it('getAttribute with no persona', async () => {
    const repoFacade = repoFactory();
    const config = {repo: repoFacade};
    await config.repo.clearRepo();
    const theService = service(config);

    const { persona } = await config.repo.createPersona({
      name: 'dave',
      organisation: TEST_ORGANISATION,
    });

    const {attribute} = await config.repo.overwritePersonaAttribute({
      key: 'hair',
      organisation: TEST_ORGANISATION,
      personaId: persona.id,
      value: 'green',
    });

    const {attribute: attributeResult} = await theService.getAttribute({
      id: attribute.id,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(attributeResult.key, 'hair');
    assert.equal(attributeResult.value, 'green');
  });
});
