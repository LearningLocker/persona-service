// tslint:disable-next-line:no-unused
import PersonaModel from '../../models/Persona';
import service from '../../tester';
import { TEST_ORGANISATION } from '../utils/values';

export default async (name?: string) => {
  const {persona} = await service.createPersona({
    name: name === undefined ? 'Dave' : name,
    organisation: TEST_ORGANISATION,
  });
  return persona;
};
