import * as assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import NoModelWithId from '../../errors/NoModelWithId';
import createTestIdentifier from '../utils/createTestIdentifier';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import { TEST_ORGANISATION, TEST_ORGANISATION_OUTSIDE_STORE } from '../utils/values';

describe('setIdentifierPersona', () => {
  const service = setup();

  it('should NoModel error if no found identifier', async () => {
    const newPersona = await createTestPersona('Dave');

    const resultPromise = service.setIdentifierPersona({
      id: '58fe13e34effd3c33a7fc4b8',
      organisation: TEST_ORGANISATION,
      persona: newPersona.id,
    });

    await assertError(NoModel, resultPromise);
  });

  it('should NoModel error if no found persona', async () => {
    const { identifier } = await createTestIdentifier();

    const resultPromise = service.setIdentifierPersona({
      id: identifier.id,
      organisation: TEST_ORGANISATION,
      persona: '58fe13e34effd3c33a7fc4b8',
    });

    await assertError(NoModelWithId, resultPromise);
  });

  it('should update existing model', async () => {
    const { identifier } = await createTestIdentifier();

    const newPersona = await createTestPersona('Dave 2');

    const result = await service.setIdentifierPersona({
      id: identifier.id,
      organisation: TEST_ORGANISATION,
      persona: newPersona.id,
    });

    assert.equal(result.identifier.persona, newPersona.id);
  });

  it('should not update identifier outside organisation', async () => {
    const { identifier } = await createTestIdentifier();

    const newPersona = await createTestPersona('Dave 2', TEST_ORGANISATION_OUTSIDE_STORE);

    const resultPromise = service.setIdentifierPersona({
      id: identifier.id,
      organisation: TEST_ORGANISATION_OUTSIDE_STORE,
      persona: newPersona.id,
    });

    await assertError(NoModel, resultPromise);
  });
});
