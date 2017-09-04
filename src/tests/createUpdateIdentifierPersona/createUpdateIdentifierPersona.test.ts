import * as assert from 'assert';
import createTestIdentifier from '../utils/createTestIdentifier';
import setup from '../utils/setup';
import {
  TEST_IFI,
  TEST_ORGANISATION,
} from '../utils/values';

describe('createUpdateIdentifierPersona', () => {
  const service = setup();

  it('Should create a new identifier and persona', async () => {

    const {identifierId, personaId} = await service.createUpdateIdentifierPersona({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Dave',
    });

    const {identifier} = await service.getIdentifier({
      id: identifierId,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(personaId, identifier.persona);

    /* istanbul ignore next */
    if (identifier.persona === undefined) {
      assert.equal(true, false, 'Persona is not set');
      throw Error('Persona is not set');
    }

    const {persona: personaResult} = await service.getPersona({
      organisation: TEST_ORGANISATION,
      personaId: identifier.persona,
    });

    assert.equal(personaResult.name, 'Dave');
  });

  it('Should return the current persona if it already exist', async () => {
    const {identifier, personaId} = await createTestIdentifier();

    const {
      identifierId: actualIdentifierId,
      personaId: actualPersonaId,
    } = await service.createUpdateIdentifierPersona({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Dave 8',
    });

    assert.equal(actualIdentifierId, identifier.id);
    assert.equal(actualPersonaId, personaId);
  });
});
