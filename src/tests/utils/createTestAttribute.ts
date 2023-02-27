import service from '../../tester';
import { TEST_ORGANISATION } from '../utils/values';
import createTestPersona from './createTestPersona';

export default async () => {
  const { id: personaId } = await createTestPersona();

  const { attribute } = await service.overwritePersonaAttribute({
    key: 'test1',
    organisation: TEST_ORGANISATION,
    personaId,
    value: 'test2',
  });
  return { attribute, personaId };
};
