import * as assert from 'assert';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('getPersonaAttributeConnectionCount', () => {
  const service = setup();

  it('should get Attributes count 0', async () => {
    const result = await service.getPersonaAttributeCount({
      filter: {},
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.count, 0);
  });

  it('should get Attributes count', async () => {
    const { persona } = await service.createPersona({
      name: 'dave',
      organisation: TEST_ORGANISATION,
    });

    await service.overwritePersonaAttribute({
      key: 'test1',
      organisation: TEST_ORGANISATION,
      personaId: persona.id,
      value: 'test2',
    });

    const result = await service.getPersonaAttributeCount({
      filter: {},
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.count, 1);
  });
});
