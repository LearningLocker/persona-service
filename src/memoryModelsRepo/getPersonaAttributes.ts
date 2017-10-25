import { filter } from 'lodash';
import Attribute from '../models/Attribute';
import GetPersonaAttributesOptions from // tslint:disable-line:import-spacing
  '../repoFactory/options/GetPersonaAttributesOptions';
import GetPersonaAttributesResult from // tslint:disable-line:import-spacing
  '../repoFactory/results/GetPersonaAttributesResult';
// tslint:disable-next-line:no-unused
import _GetPersonaAttributesOptions from // tslint:disable-line:import-spacing
  '../serviceFactory/options/GetPersonaAttributesOptions';
// tslint:disable-next-line:no-unused
import _GetPersonaAttributesResult from // tslint:disable-line:import-spacing
  '../serviceFactory/results/GetPersonaAttributesResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    organisation,
    personaId,
  }: GetPersonaAttributesOptions): Promise<GetPersonaAttributesResult> => {

    const attributes: Attribute[] = filter<Attribute>(
      config.state.personaAttributes,
      {
        organisation,
        personaId,
      },
    );

    return {
      attributes,
    };
  };
};
