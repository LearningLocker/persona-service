import * as assert from 'assert';
import { map, times } from 'lodash';
import Persona from '../../models/Persona';
import { modelToCursor } from '../../repoFactory/utils/cursor';
import CreatePersonaResult from '../../serviceFactory/results/CreatePersonaResult';
import GetOptions, { CursorDirection } from '../../serviceFactory/utils/GetOptions';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('getPersonasConnection', () => {

  const service = setup();

  const addTestPersonas = async () => {

    const NUM_PERSONAS = 4;

    const resultsPromise: Promise<CreatePersonaResult>[] = times(NUM_PERSONAS, (i) => {
      return service.createPersona({
        name: `Dave ${i}`,
        organisation: TEST_ORGANISATION,
      });
    });

    const results: ArrayLike<CreatePersonaResult> = await Promise.all(resultsPromise);

    return map<CreatePersonaResult, Persona>(results, ({persona}) => persona );
  };

  const fromFirstCursor = modelToCursor({
    model: {
      name: 'Dave 0',
    },
    sort: {
      name: 1,
    },
  });

  const getPersonaOptions = {
    direction: CursorDirection.FORWARDS,
    filter: {},
    limit: 2,
    maxScan: 0,
    maxTimeMS: 0,
    organisation: TEST_ORGANISATION,
    project: {},
    sort: {
      name: 1,
    },
  } as GetOptions;

  it('Should get the 2 personas', async () => {
    await addTestPersonas();

    const result = await service.getPersonasConnection({
      ...getPersonaOptions,
      cursor: fromFirstCursor,
    });

    const TWO = 2;
    assert.equal(result.edges.length, TWO);
    assert.equal(result.edges[0].node.name, 'Dave 1');
    assert.equal(result.edges[1].node.name, 'Dave 2');
  });
});
