import * as assert from 'assert';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
} from '../utils/values';

describe('overwritePersonaAttribute', () => {
  const personaId = '58fe13e34eabd3c26a7fc4c7';
  const service = setup();

  it('should create info', async () => {
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
    const result = await service.overwritePersonaAttribute({
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId,
      value: 'theValue1',
    });

    assert.equal(result.attribute.key, 'theKey');
    assert.equal(result.attribute.value, 'theValue1');

    const result2 = await service.overwritePersonaAttribute({
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId,
      value: 222,
    });

    const expectedResult = 222;
    assert.equal(result2.attribute.key, 'theKey');
    assert.equal(result2.attribute.value, expectedResult);

    const result3 = await service.getPersonaAttributes({
      organisation: TEST_ORGANISATION,
      personaId,
    });

    assert.equal(result3.attributes.length, 1);
    assert.equal(result3.attributes[0].key, 'theKey');
    assert.equal(result3.attributes[0].value, expectedResult);
  });
});
