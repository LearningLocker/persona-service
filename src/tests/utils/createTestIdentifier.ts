// tslint:disable-next-line:no-unused
import Identifier from '../../models/Identifier';
import service from '../../tester';
import { TEST_IFI, TEST_ORGANISATION } from '../utils/values';
import createTestPersona from './createTestPersona';

export default async () => {
  const {id: personaId} = await createTestPersona();

  const {identifier} = await service.createIdentifier({
    ifi: TEST_IFI,
    organisation: TEST_ORGANISATION,
    persona: personaId,
  });
  return {identifier, personaId};
};
