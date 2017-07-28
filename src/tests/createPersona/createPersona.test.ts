import * as assert from 'assert';
import setup from '../utils/setup';
import { TEST_CLIENT } from '../utils/values';

describe('createPersona', () => {

  const service = setup();

  it('Should create persona', async () => {
    const {persona} = await service.createPersona({name: 'Dave', client: TEST_CLIENT});

    const {persona: actualPersona} = await service.getPersona({
      client: TEST_CLIENT,
      personaId: persona.id,
    });

    assert.equal(actualPersona.id, persona.id);
    assert.equal(actualPersona.name, 'Dave');
    assert.equal(actualPersona.organisation, TEST_CLIENT.organisation);
  });
});
