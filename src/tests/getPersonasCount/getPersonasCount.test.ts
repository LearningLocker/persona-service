import * as assert from 'assert';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('getPersonasCount', () => {
  const service = setup();
  it('should get personas count 0', async () => {
    const result = await service.getPersonaCount({
      filter: {},
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.count, 0);
  });

  it('should get personas count', async () => {
    await service.createPersona({
      name: 'dave',
      organisation: TEST_ORGANISATION,
    });

    const result = await service.getPersonaCount({
      filter: {},
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.count, 1);
  });

  it('should get personas count with regex', async () => {
    await service.createPersona({
      name: 'dave',
      organisation: TEST_ORGANISATION,
    });

    await service.createPersona({
      name: 'test',
      organisation: TEST_ORGANISATION,
    });

    const result = await service.getPersonaCount({
      filter: {
        $comment: 'test comment',
        name: {
          $regex: /^dave/i,
        },
      },
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.count, 1);
  });
});
