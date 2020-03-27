import * as assert from 'assert';
import createTestPersona from '../utils/createTestPersona';
import createTestPersonaWithoutName from '../utils/createTestPersonaWithoutName';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('createPersona', () => {

  const service = setup();

  it('Should create persona', async () => {
    const persona = await createTestPersona();
    const {persona: actualPersona} = await service.getPersona({
      organisation: TEST_ORGANISATION,
      personaId: persona.id,
    });

    assert.equal(actualPersona.id, persona.id);
    assert.equal(actualPersona.name, 'Dave');
    assert.equal(actualPersona.organisation, TEST_ORGANISATION);
  });

  it('Should create a persona with personaId instead name, if name not exists.', async () => {
    const persona = await createTestPersonaWithoutName();
    const {persona: actualPersona} = await service.getPersona({
      organisation: TEST_ORGANISATION,
      personaId: persona.id,
    });

    assert.equal(actualPersona.id, persona.id);
    assert.equal(actualPersona.name, persona.id.toString());
    assert.equal(actualPersona.organisation, TEST_ORGANISATION);
  });
});
