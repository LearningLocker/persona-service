import service from '../../tester';
import { TEST_CLIENT } from '../utils/values';

export default async () => {
  const {persona} = await service.createPersona({
    client: TEST_CLIENT,
    name: 'Dave',
  });
  return persona;
};
