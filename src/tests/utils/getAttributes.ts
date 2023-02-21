import { map, times } from 'lodash';
import type Attribute from '../../models/Attribute';
import { modelToCursor } from '../../repoFactory/utils/cursor';
import type OverwritePersonaAttributeResult from '../../serviceFactory/results/OverwritePersonaAttributeResult';
import type Service from '../../serviceFactory/Service';
import type GetOptions from '../../serviceFactory/utils/GetOptions';
import { CursorDirection } from '../../serviceFactory/utils/GetOptions';
import createTestPersona from '../utils/createTestPersona';
import { TEST_ORGANISATION } from '../utils/values';

export const getAttributesOptions = {
  direction: CursorDirection.FORWARDS,
  filter: {},
  limit: 10,
  maxScan: 0,
  maxTimeMS: 0,
  organisation: TEST_ORGANISATION,
  project: {},
  sort: {
    value: 1,
  },
} as GetOptions;

export const fromFirstCursor = modelToCursor({
  model: {
    value: 'brown11',
  },
  sort: {
    value: 1,
  },
});

export const addTestAttributes = async (service: Service) => {
  const persona = await createTestPersona();

  const NUM_IDENTIFERS = 12;
  const resultsPromise: Promise<OverwritePersonaAttributeResult>[] = times(NUM_IDENTIFERS,
    async (i) => {
      return await service.overwritePersonaAttribute({
        key: `hair${i}`,
        organisation: TEST_ORGANISATION,
        personaId: persona.id,
        value: `brown${i}`,
      });
    },
  );

  const results: ArrayLike<OverwritePersonaAttributeResult> = await Promise.all(resultsPromise);

  return map<OverwritePersonaAttributeResult, Attribute>(results, ({ attribute }) => attribute);
};
