import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import NoModelWithId from '../../errors/NoModelWithId';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('updatePersona', () => {
  const service = setup();

  it('should update a person', async () => {
    const { persona } = await service.createPersona({
      name: 'Test 1',
      organisation: TEST_ORGANISATION,
    });

    const { persona: newPersona } = await service.updatePersona({
      name: 'Test 2',
      organisation: TEST_ORGANISATION,
      personaId: persona.id,
    });

    assert.equal(newPersona.name, 'Test 2');

    const { persona: newPersona2 } = await service.getPersona({
      organisation: TEST_ORGANISATION,
      personaId: persona.id,
    });

    assert.equal(newPersona2.name, 'Test 2');
  });

  it('should throw error if no model found', () => {
    const updatePromise = service.updatePersona({
      name: 'Test 3',
      organisation: TEST_ORGANISATION,
      personaId: '58fe11e24effd3c35a7fc4b8',
    });

    return assertError(NoModelWithId, updatePromise);
  });

  it('should create the persona if upsert is true', async () => {
    const name = 'Test 4';
    const personaId = '58fe11e24effd3c35a7fc4b8';
    const { persona } = await service.updatePersona({
      name,
      organisation: TEST_ORGANISATION,
      personaId,
      upsert: true,
    });

    assert.equal(persona.id, personaId);
    assert.equal(persona.name, name);
  });
});
