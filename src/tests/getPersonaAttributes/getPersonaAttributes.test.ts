// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
import * as assert from 'assert';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
} from '../utils/values';

describe('getPersonaAttributes', () => {
  const service = setup();

  it('should get all persona attributes with default options', async () => {
    const newPersona = await createTestPersona('Dave');
    const newPersona2 = await createTestPersona('Dave 2');
    const attributeData1 = {
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId: newPersona.id,
      value: 'theValue',
    };
    const attributeData2 = {
      key: 'theKey2',
      organisation: TEST_ORGANISATION,
      personaId: newPersona.id,
      value: true,
    };
    const attributeData3 = {
      key: 'theKey3',
      organisation: TEST_ORGANISATION,
      personaId: newPersona2.id,
      value: true,
    };

    const { attribute: attribute1 } = await service.overwritePersonaAttribute(attributeData1);
    const { attribute: attribute2 } = await service.overwritePersonaAttribute(attributeData2);
    await service.overwritePersonaAttribute(attributeData3);

    const result = await service.getPersonaAttributes({
      organisation: TEST_ORGANISATION,
      personaId: newPersona.id,
    });

    assert.equal(result.attributes.length, 2); // tslint:disable-line:no-magic-numbers

    assert.deepEqual(result.attributes[0], attribute1);
    assert.deepEqual(result.attributes[1], attribute2);
  });

  it('should get all persona attributes matching a filter', async () => {
    const newPersona = await createTestPersona('Dave');
    const newPersona2 = await createTestPersona('Dave 2');
    const attributeData1 = {
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId: newPersona.id,
      value: 'theValue',
    };
    const attributeData2 = {
      key: 'theKey2',
      organisation: TEST_ORGANISATION,
      personaId: newPersona.id,
      value: true,
    };
    const attributeData3 = {
      key: 'theKey3',
      organisation: TEST_ORGANISATION,
      personaId: newPersona2.id,
      value: true,
    };

    const { attribute: attribute1 } = await service.overwritePersonaAttribute(attributeData1);
    await service.overwritePersonaAttribute(attributeData2);
    await service.overwritePersonaAttribute(attributeData3);

    const result = await service.getPersonaAttributes({
      filter: { key: 'theKey' },
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.attributes.length, 1);

    assert.deepEqual(result.attributes[0], attribute1);
  });

  it('should get all persona attributes following the sort order', async () => {
    const newPersona = await createTestPersona('Dave');
    const newPersona2 = await createTestPersona('Dave 2');
    const attributeData1 = {
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId: newPersona.id,
      value: 'theValue',
    };
    const attributeData2 = {
      key: 'theKey2',
      organisation: TEST_ORGANISATION,
      personaId: newPersona.id,
      value: true,
    };
    const attributeData3 = {
      key: 'theKey3',
      organisation: TEST_ORGANISATION,
      personaId: newPersona2.id,
      value: true,
    };

    const { attribute: attribute1 } = await service.overwritePersonaAttribute(attributeData1);
    const { attribute: attribute2 } = await service.overwritePersonaAttribute(attributeData2);
    const { attribute: attribute3 } = await service.overwritePersonaAttribute(attributeData3);

    const result = await service.getPersonaAttributes({
      organisation: TEST_ORGANISATION,
      sort: { key: -1 },
    });

    assert.equal(result.attributes.length, 3);

    assert.deepEqual(result.attributes[0], attribute3);
    assert.deepEqual(result.attributes[1], attribute2);
    assert.deepEqual(result.attributes[2], attribute1);
  });

  it('should get all persona attributes with a limit', async () => {
    const newPersona = await createTestPersona('Dave');
    const newPersona2 = await createTestPersona('Dave 2');
    const attributeData1 = {
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId: newPersona.id,
      value: 'theValue',
    };
    const attributeData2 = {
      key: 'theKey2',
      organisation: TEST_ORGANISATION,
      personaId: newPersona.id,
      value: true,
    };
    const attributeData3 = {
      key: 'theKey3',
      organisation: TEST_ORGANISATION,
      personaId: newPersona2.id,
      value: true,
    };

    await service.overwritePersonaAttribute(attributeData1);
    await service.overwritePersonaAttribute(attributeData2);
    await service.overwritePersonaAttribute(attributeData3);

    const result = await service.getPersonaAttributes({
      limit: 1,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.attributes.length, 1);
  });

  it('should get all persona attributes with a skip', async () => {
    const newPersona = await createTestPersona('Dave');
    const newPersona2 = await createTestPersona('Dave 2');
    const attributeData1 = {
      key: 'theKey',
      organisation: TEST_ORGANISATION,
      personaId: newPersona.id,
      value: 'theValue',
    };
    const attributeData2 = {
      key: 'theKey2',
      organisation: TEST_ORGANISATION,
      personaId: newPersona.id,
      value: true,
    };
    const attributeData3 = {
      key: 'theKey3',
      organisation: TEST_ORGANISATION,
      personaId: newPersona2.id,
      value: true,
    };

    await service.overwritePersonaAttribute(attributeData1);
    const { attribute: attribute2 } = await service.overwritePersonaAttribute(attributeData2);
    const { attribute: attribute3 } = await service.overwritePersonaAttribute(attributeData3);

    const result = await service.getPersonaAttributes({
      organisation: TEST_ORGANISATION,
      skip: 1,
    });

    assert.equal(result.attributes.length, 2);
    assert.deepEqual(result.attributes[0], attribute2);
    assert.deepEqual(result.attributes[1], attribute3);
  });
});
