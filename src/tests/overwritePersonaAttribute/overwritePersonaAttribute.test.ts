import * as assert from 'assert';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
} from '../utils/values';

describe('overwritePersonaAttribute', () => {
  const personaId = '58fe13e34eabd3c26a7fc4c7';
  const service = setup();

  it('should create attribute', async () => {
    const attribute1 = {
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId,
      value: 'theValue',
    };

    const result = await service.overwritePersonaAttribute(attribute1);

    assert.deepEqual(result.attribute, {
      ...attribute1,
      id: result.attribute.id,
    });
  });

  it('should overwrite existing attribute', async () => {
    const attribute1 = {
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId,
      value: 'theValue1',
    };
    const attribute2 = {
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId,
      value: 222,
    };

    const result = await service.overwritePersonaAttribute(attribute1);
    assert.deepEqual(result.attribute, {
      ...attribute1,
      id: result.attribute.id,
    });

    const result2 = await service.overwritePersonaAttribute(attribute2);

    assert.deepEqual(result2.attribute, {...attribute2, id: result2.attribute.id});

    const result3 = await service.getPersonaAttributes({
      organisation: TEST_ORGANISATION,
      personaId,
    });

    assert.deepEqual(result3.attributes[0], {
      ...attribute2,
      id: result3.attributes[0].id,
    });
  });
});
