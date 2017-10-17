import * as assert from 'assert';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
} from '../utils/values';

describe('overwritePersonaAttribute', () => {
  const personaId = '58fe13e34eabd3c26a7fc4c7';
  const service = setup();

  it('should create attribute', async () => {
    // Setup
    const result = await service.overwritePersonaAttribute({
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId,
      value: 'theValue',
    });

    assert.equal(result.attribute.key, 'theKey');
    assert.equal(result.attribute.value, 'theValue');
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
    assert.deepEqual(result.attribute, attribute1);

    const result2 = await service.overwritePersonaAttribute(attribute2);
    assert.deepEqual(result2.attribute, attribute2);

    const result3 = await service.getPersonaAttributes({
      organisation: TEST_ORGANISATION,
      personaId,
    });
    assert.deepEqual(result3.attributes[0], attribute2);
  });
});
