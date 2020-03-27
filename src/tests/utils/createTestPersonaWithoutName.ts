// tslint:disable-next-line:no-unused
import PersonaModel from '../../models/Persona';
import service from '../../tester';
import { TEST_ORGANISATION } from './values';

export default async (organisation: string = TEST_ORGANISATION) => {
  const {persona} = await service.createPersona({
    organisation,
  });
  return persona;
};
