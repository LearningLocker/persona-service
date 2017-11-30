import NoModel from 'jscommons/dist/errors/NoModel';
import GetAttributeOptions from '../repoFactory/options/GetAttributeOptions';
import GetAttributeResult from '../repoFactory/results/GetAttributeResult';
import _GetAttributeOptions from // tslint:disable-line:import-spacing no-unused
  '../serviceFactory/options/GetAttributeOptions';
import _GetAttributeResult from // tslint:disable-line:import-spacing no-unused
  '../serviceFactory/results/GetAttributeResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttributeOptions): Promise<GetAttributeResult> => {
    const matchingAttributes = config.state.personaAttributes.filter((attribute2) => {
      return attribute2.id === opts.id && attribute2.organisation === opts.organisation;
    });

    const isExistingAttribute = matchingAttributes.length !== 0;
    if (!isExistingAttribute) {
      throw new NoModel('Attribute');
    }

    const attribute = matchingAttributes[0];
    return { attribute };
  };
};
