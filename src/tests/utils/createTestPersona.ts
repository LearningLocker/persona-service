import PersonaModel from '../../models/Persona';
import service from '../../tester';
import { TEST_ORGANISATION } from '../utils/values';

export default async () => {
  const {persona} = await service.createPersona({
    name: 'Dave',
    organisation: TEST_ORGANISATION,
  });
  return persona;
};
