import NoModel from 'jscommons/dist/errors/NoModel';
import Agent from '../models/Agent';
import GetFullAgentOptions from '../serviceFactory/options/GetFullAgentOptions';
import GetFullAgentResult from '../serviceFactory/results/GetFullAgentResult';
import Config from './Config';
import checkProfileReadScopes from './utils/checkProfileReadScopes';
import getIfiFromAgent from './utils/getIfiFromAgent';
import validateAgent from './utils/validateAgent';

const getCurrentFullAgent = (agent: Agent) => {
  return {
    account: agent.account === undefined ? [] : [agent.account],
    mbox: agent.mbox === undefined ? [] : [agent.mbox],
    mbox_sha1sum: agent.mbox_sha1sum === undefined ? [] : [agent.mbox_sha1sum],
    name: [],
    objectType: 'Person',
    openid: agent.openid === undefined ? [] : [agent.openid],
  };
};

export default (config: Config) => {
  return async (opts: GetFullAgentOptions): Promise<GetFullAgentResult> => {
    checkProfileReadScopes(opts.client.scopes);
    try {
      // Validates agent.
      const agent = opts.agent;
      validateAgent(agent, ['agent']);

      // Finds Identifier using Agent.
      const client = opts.client;
      const ifi = getIfiFromAgent(agent);
      const getIdentifierResult = await config.repo.getIdentifierByIfi({ client, ifi });

      if (getIdentifierResult.personaId === undefined) {
        /* istanbul ignore next - would only happen with bad timing */
        return getCurrentFullAgent(agent);
      }

      // Finds the IFIs using the personaId in the Identifier.
      const personaId = getIdentifierResult.personaId;
      const getIfisResult = await config.repo.getIfisByPersona({ personaId });

      // Calculates the full agent from the IFIs.
      const personaResult = await config.repo.getPersona({ personaId, client });
      const initialResult: GetFullAgentResult = {
        account: [],
        mbox: [],
        mbox_sha1sum: [],
        name: personaResult.name === undefined ? [] : [personaResult.name],
        objectType: 'Person',
        openid: [],
      };
      return getIfisResult.ifis.reduce((result: GetFullAgentResult, matchedIfi) => {
        switch (matchedIfi.key) {
          case 'account':
            return {
              ...result,
              account: [matchedIfi.value, ...result.account],
            };
          case 'mbox':
            return {
              ...result,
              mbox: [matchedIfi.value, ...result.mbox],
            };
          case 'mbox_sha1sum':
            return {
              ...result,
              mbox_sha1sum: [matchedIfi.value, ...result.mbox_sha1sum],
            };
          case 'openid':
            return {
              ...result,
              openid: [matchedIfi.value, ...result.openid],
            };
          default:
            /* istanbul ignore next */
            throw new Error('Invalid IFI Key');
        }
      }, initialResult);
    } catch (err) {
      if (err.constructor === NoModel) {
        return getCurrentFullAgent(opts.agent);
      }
      throw err;
    }
  };
};
