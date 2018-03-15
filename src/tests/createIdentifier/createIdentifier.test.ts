import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import Conflict from '../../errors/Conflict';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import {
  TEST_ACCOUNT_IFI,
  TEST_IFI,
  TEST_ORGANISATION,
  TEST_ORGANISATION_OUTSIDE_STORE,
} from '../utils/values';

describe('createIdentifier', () => {
  const service = setup();

  it('Should create identifier', async () => {
    const persona = await createTestPersona();
    const {identifier} = await service.createIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });
    const {identifier: actualIdentifier} = await service.getIdentifier({
      id: identifier.id,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(actualIdentifier.id, identifier.id);
    assert.deepEqual(actualIdentifier.ifi, TEST_IFI);
    assert.equal(actualIdentifier.organisation, TEST_ORGANISATION);
    assert.equal(actualIdentifier.persona, persona.id);
  });

  it('should throw a Conflict inserting an ifi that exists in an organisation', async () => {
    const persona = await createTestPersona();

    await service.createIdentifier({
      ifi: TEST_ACCOUNT_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    const createPromise = service.createIdentifier({
      ifi: TEST_ACCOUNT_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    await assertError(Conflict, createPromise);
  });

  it('should throw a Conflict inserting an ifi with differently ordered ifi value keys', async () => {
    const persona = await createTestPersona();

    const homePage = 'http://test.com';
    const name = 'test';
    await service.createIdentifier({
      ifi: {
        key: 'account',
        value: {
          homePage,
          name,
        }
      },
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    const createPromise = service.createIdentifier({
      ifi: {
        key: 'account',
        value: {
          name,
          homePage,
        }
      },
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });
   
    
    const createPromise2 = service.createIdentifier({
      ifi: {
        value: {
          name,
          homePage,
        },
        key: 'account',
      },
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });
    await assertError(Conflict, createPromise);
    await assertError(Conflict, createPromise2);
  });
  
  it('Should create identifiers in different organisations', async () => {
    const persona = await createTestPersona();
    const otherOrgPersona = await createTestPersona(
      'otherorg person',
      TEST_ORGANISATION_OUTSIDE_STORE,
    );

      await service.createIdentifier({
        ifi: TEST_IFI,
        organisation: TEST_ORGANISATION,
        persona: persona.id,
      });

      await service.createIdentifier({
        ifi: TEST_IFI,
        organisation: TEST_ORGANISATION_OUTSIDE_STORE,
        persona: otherOrgPersona.id,
      });
  });
});
