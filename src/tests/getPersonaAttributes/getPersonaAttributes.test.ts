// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
import * as assert from 'assert';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
  TEST_PERSONA_ID,
  TEST_PERSONA_ID_2,
} from '../utils/values';

describe('getPersonaAttributes', () => {
  const personaId = TEST_PERSONA_ID;
  const service = setup();
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
  const attribute3 = {
    key: 'theKey3',
    organisation: TEST_ORGANISATION,
    personaId: TEST_PERSONA_ID_2,
    value: true,
  };

  beforeEach(async () => {
    await service.clearService();
    await service.overwritePersonaAttribute(attribute1);
    await service.overwritePersonaAttribute(attribute2);
    await service.overwritePersonaAttribute(attribute3);
  });

  after(async () => {
    await service.clearService();
  });

  it('should get all persona attributes with default options', async () => {
    const result = await service.getPersonaAttributes({
      organisation: TEST_ORGANISATION,
      personaId,
    });

    assert.equal(result.attributes.length, 2); // tslint:disable-line:no-magic-numbers

    assert.deepEqual(result.attributes[0], {
      ...attribute1,
      id: result.attributes[0].id,
    });
    assert.deepEqual(result.attributes[1], {
      ...attribute2,
      id: result.attributes[1].id,
    });
  });

  it('should get all persona attributes matching a filter', async () => {
    const result = await service.getPersonaAttributes({
      filter: { key: 'theKey' },
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.attributes.length, 1);

    assert.deepEqual(result.attributes[0], {
      ...attribute1,
      id: result.attributes[0].id,
    });
  });

  it('should get all persona attributes following the sort order', async () => {
    const result = await service.getPersonaAttributes({
      organisation: TEST_ORGANISATION,
      sort: { key: -1 },
    });

    assert.equal(result.attributes.length, 3);

    assert.deepEqual(result.attributes[2], {
      ...attribute1,
      id: result.attributes[2].id,
    });
  });

  it('should get all persona attributes with a limit', async () => {
    const result = await service.getPersonaAttributes({
      limit: 1,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.attributes.length, 1);
  });

  it('should get all persona attributes with a skip', async () => {
    const result = await service.getPersonaAttributes({
      organisation: TEST_ORGANISATION,
      skip: 1,
    });

    assert.equal(result.attributes.length, 2);
    assert.deepEqual(result.attributes[0], {
      ...attribute2,
      id: result.attributes[0].id,
    });
  });
});
