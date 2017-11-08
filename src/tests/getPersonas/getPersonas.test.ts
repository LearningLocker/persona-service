import * as assert from 'assert';
import { map, times } from 'lodash';
import Persona from '../../models/Persona';
import CreatePersonaResult from '../../serviceFactory/results/CreatePersonaResult';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('getPersonas', () => {
  const service = setup();

  beforeEach(async () => {
    await service.clearService();
  });

  after(async () => {
    await service.clearService();
  });

  const addTestPersonas = async () => {
    // tslint:disable-next-line:no-magic-numbers
    const resultsPromise: Promise<CreatePersonaResult>[] = times(4, (i) => {
      return service.createPersona({
        name: `Dave ${i}`,
        organisation: TEST_ORGANISATION,
      });
    });

    const results: ArrayLike<CreatePersonaResult> = await Promise.all(resultsPromise);

    return map<CreatePersonaResult, Persona>(results, ({persona}) => persona );
  };

  it('Should get the 2 personas', async () => {
    await addTestPersonas();

    const result = await service.getPersonas({
      filter: {},
      limit: 10,
      organisation: TEST_ORGANISATION,
      skip: 0,
      sort: {},
    });

    assert.equal(result.personas.length, 4); // tslint:disable-line:no-magic-numbers
  });
});
