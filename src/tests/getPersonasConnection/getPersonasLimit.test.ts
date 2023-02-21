import * as assert from 'assert';
import { map } from 'lodash';
import type GetOptions from '../../serviceFactory/utils/GetOptions';
import { CursorDirection } from '../../serviceFactory/utils/GetOptions';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('getPersonas', () => {
  const service = setup();

  it('should get default 10 personas', async () => {
    const indexArray = Array.from(Array(11).keys());
    await Promise.all(map(indexArray, async (i) => {
      return await service.createPersona({
        name: `Dave ${i}`,
        organisation: TEST_ORGANISATION,
      });
    }));

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
