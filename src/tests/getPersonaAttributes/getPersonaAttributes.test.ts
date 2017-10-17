import * as assert from 'assert';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
  TEST_PERSONA_ID,
} from '../utils/values';

describe('getPersonaAttributes', () => {
  const personaId = TEST_PERSONA_ID;
  const service = setup();

  it('should get all persona attribute', async () => {
    const attribute1 = {
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId,
      value: 'theValue',
    };
    const attribute2 = {
      key: 'theKey2',
      organisation: TEST_ORGANISATION,
      personaId,
      value: true,
    };

    await service.overwritePersonaAttribute(attribute1);

    await service.overwritePersonaAttribute(attribute2);

    const result = await service.getPersonaAttributes({
      organisation: TEST_ORGANISATION,
      personaId,
    });

    assert.deepEqual(result.attributes[0], {
      ...attribute1,
      id: result.attributes[0].id,
    });
    assert.deepEqual(result.attributes[1], {
      ...attribute2,
      id: result.attributes[1].id,
    });
  });
});
