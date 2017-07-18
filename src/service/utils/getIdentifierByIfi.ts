import Config from '../Config';
import getIfiFromAgent from './getIfiFromAgent';
import validateAgent from './validateAgent';

export default async (config: Config, agent: any) => {
  // Validates agent.
  validateAgent(agent, ['agent']);

  // Finds Identifier using Agent.
  const ifi = getIfiFromAgent(agent);
  const personaIdentifier = (await config.repo.getIdentifierByIfi({ ifi })).identifierId;
  return personaIdentifier;
};
