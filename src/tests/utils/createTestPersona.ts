import service from '../../tester';
import { TEST_ORGANISATION } from './values';

export default async (name?: string, organisation: string = TEST_ORGANISATION) => {
  const { persona } = await service.createPersona({
    name: name === undefined ? 'Dave' : name,
    organisation,
  });
  return persona;
};
