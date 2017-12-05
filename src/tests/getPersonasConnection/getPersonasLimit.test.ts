// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
import * as assert from 'assert';
import { map as bluebirdMap } from 'bluebird';
import GetOptions, { CursorDirection } from '../../serviceFactory/utils/GetOptions';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('getPersonas', () => {
  const service = setup();

  it('should get default 10 personas', async () => {

    const indexArray = Array.from(Array(11).keys());
    await bluebirdMap(indexArray, (i) => {
      return service.createPersona({
        name: `Dave ${i}`,
        organisation: TEST_ORGANISATION,
      });
    });

    const result = await service.getPersonasConnection({
      direction: CursorDirection.FORWARDS,
      filter: {},
      maxScan: 0,
      maxTimeMS: 0,
      organisation: TEST_ORGANISATION,
      project: {},
      sort: {
        name: 1,
      },
    } as any as GetOptions);

    assert.equal(result.edges.length, 10);
  });
});
