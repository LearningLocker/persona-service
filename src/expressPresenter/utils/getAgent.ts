import { createRequiredWarning, Warnings } from 'rulr';

export default (agentParam: string|undefined) => {
  if (agentParam === undefined) {
    const warnings = [createRequiredWarning(agentParam, ['query', 'agent'])];
    throw new Warnings({}, ['query'], warnings);
  }

  return JSON.parse(agentParam);
};
