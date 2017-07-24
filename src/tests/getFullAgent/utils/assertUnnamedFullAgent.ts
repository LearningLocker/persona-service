import * as assert from 'assert';
import GetFullAgentResult from '../../../serviceFactory/results/GetFullAgentResult';
import service from '../../../tester';
import { TEST_CLIENT } from '../../utils/values';

export default async (agent: any, resultOverrides: Partial<GetFullAgentResult>) => {
  const fullAgent = await service.getFullAgent({
    agent,
    client: TEST_CLIENT,
  });
  const expectedResult: GetFullAgentResult = {
    account: [],
    mbox: [],
    mbox_sha1sum: [],
    name: [],
    objectType: 'Person',
    openid: [],
    ...resultOverrides,
  };
  assert.deepEqual(fullAgent, expectedResult);
};
