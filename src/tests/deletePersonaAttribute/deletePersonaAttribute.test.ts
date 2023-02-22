import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { ObjectId } from 'mongodb';
import NoModelWithId from '../../errors/NoModelWithId';
import createTestAttribute from '../utils/createTestAttribute';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('deletePersonaAttribute', () => {
  const service = setup();

  it('Should delete persona attribute', async () => {
    const { attribute } = await createTestAttribute();

    await service.deletePersonaAttribute({
      id: attribute.id,
      organisation: attribute.organisation,
    });

    const { attributes } = await service.getPersonaAttributes({
      organisation: attribute.organisation,
    });

    assert.equal(attributes.length, 0);
  });

  it('should fail delete if persona does not exist', async () => {
    const result = service.deletePersonaAttribute({
      id: new ObjectId().toString(),
      organisation: TEST_ORGANISATION,
    });

    await assertError(NoModelWithId, result);
  });
});
