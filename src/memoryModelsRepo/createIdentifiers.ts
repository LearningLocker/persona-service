import CreateIdentifiersOptions from '../repoFactory/options/CreateIdentifiersOptions';
import CreateIdentifiersResult from '../repoFactory/results/CreateIdentifiersResult';
import Config from './Config';
import createIdentifier from './createIdentifier';

export default (config: Config) => {
  const createIdentifierFn = createIdentifier(config);

  return async ({client, ifis}: CreateIdentifiersOptions): Promise<CreateIdentifiersResult> => {
    const result = await Promise.all(ifis.map((ifi) => createIdentifierFn({
      client,
      ifi,
    })));

    return {
      identifiersCreationResult: result,
    };
  };
};
