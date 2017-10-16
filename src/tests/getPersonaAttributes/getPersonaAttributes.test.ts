import * as assert from 'assert';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
} from '../utils/values';

describe('getPersonaAttributes', () => {
  const personaId = '58f113e34eabd3c26a7fc4c7';
  const service = setup();

  it('should get all persona attribute', async () => {
    await service.overwritePersonaAttribute({
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId,
      value: 'theValue',
    });

    await service.overwritePersonaAttribute({
      key: 'theKey2',
      organisation: TEST_ORGANISATION,
      personaId,
      value: true,
    });

    const result = await service.getPersonaAttributes({
      organisation: TEST_ORGANISATION,
      personaId,
    });

    const expectedLength = 2;
    assert.equal(result.attributes.length, expectedLength);
    assert.equal(result.attributes[0].value, 'theValue');
    assert.equal(result.attributes[1].value, true);
  });
});
