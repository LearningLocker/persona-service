import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { ObjectID } from 'mongodb';
import NoModelWithId from '../../errors/NoModelWithId';
import createTestIdentifier from '../utils/createTestIdentifier';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('deletePersonaIdentifier', () => {
  const service = setup();

  it('Should delete persona identifier', async () => {
    const { identifier } = await createTestIdentifier();

    await service.deletePersonaIdentifier({
      id: identifier.id,
      organisation: identifier.organisation,
    });

    const { identifiers } = await service.getPersonaIdentifiers({
      organisation: identifier.organisation,
    });

    assert.equal(identifiers.length, 0);
  });

  it('should fail delete if persona does not exist', async () => {
    const result = service.deletePersonaIdentifier({
      id: new ObjectID().toString(),
      organisation: TEST_ORGANISATION,
    });

    await assertError(NoModelWithId, result);
  });
});
