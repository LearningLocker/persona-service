import * as assert from 'assert';
import { map, times } from 'lodash';
import { ObjectID } from 'mongodb';
import Persona from '../../models/Persona';
import { modelToCursor } from '../../repoFactory/utils/cursor';
import CreatePersonaResult from '../../serviceFactory/results/CreatePersonaResult';
import GetOptions, { CursorDirection } from '../../serviceFactory/utils/GetOptions';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('getPersonasConnectionId', () => {
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

  it('Should get personas with id sort', async () => {
    const personas = await addTestPersonas();

    const getPersonaOptionsIdSort = {
      direction: CursorDirection.FORWARDS,
      filter: {},
      limit: 2,
      maxScan: 0,
      maxTimeMS: 0,
      organisation: TEST_ORGANISATION,
      project: {},
      sort: {
        _id: 1,
      },
    } as GetOptions;

    const TWO = 2;

    const result = await service.getPersonasConnection({
      ...getPersonaOptionsIdSort,
      cursor: modelToCursor({
        model: { _id: new ObjectID(personas[TWO].id) },
        sort: {
          _id: 1,
        },
      }),
    });

    assert.equal(result.edges.length, 1);
  });
});
