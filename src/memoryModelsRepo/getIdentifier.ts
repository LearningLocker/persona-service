import NoModel from 'jscommons/dist/errors/NoModel';
import GetIdentifierOptions from '../repoFactory/options/GetIdentifierOptions';
import GetIdentifierResult from '../repoFactory/results/GetIdentifierResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetIdentifierOptions): Promise<GetIdentifierResult> => {
    const matchingIdentifiers = config.state.personaIdentifiers.filter((identifier2) => {
      return identifier2.id === opts.id && identifier2.organisation === opts.organisation;
    });

    const isExistingIdentinnfier = matchingIdentifiers.length !== 0;
    if (!isExistingIdentinnfier) {
      throw new NoModel('Identifier');
    }

    const identifier = matchingIdentifiers[0];
    return { identifier, locked: identifier.locked };
  };
};
