import { assign, findIndex } from 'lodash';
import { v4 as uuid } from 'uuid';
import Attribute from '../models/Attribute';
import OverwritePersonaAttributeOptions from // tslint:disable-line:import-spacing
  '../repoFactory/options/OverwritePersonaAttributeOptions';
import OverwritePersonaAttributeResult from // tslint:disable-line:import-spacing
  '../repoFactory/results/OverwritePersonaAttributeResult';
// tslint:disable-next-line:no-unused
import _OverwritePersonaAttributeOptions from // tslint:disable-line:import-spacing
  '../serviceFactory/options/OverwritePersonaAttributeOptions';
// tslint:disable-next-line:no-unused
import _OverwritePersonaAttributeResult from // tslint:disable-line:import-spacing
  '../serviceFactory/results/OverwritePersonaAttributeResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    key,
    organisation,
    personaId,
    value,
  }: OverwritePersonaAttributeOptions): Promise<OverwritePersonaAttributeResult> => {
      const personaAttributeIndex = findIndex(config.state.personaAttributes, {
        key,
        organisation,
        personaId,
      });

      const personaAttribute = (personaAttributeIndex > -1) ?
        config.state.personaAttributes[personaAttributeIndex] :
          {
            id: uuid(),
            key,
            organisation,
            personaId,
          };

      const newPersonaAttribute: Attribute =  assign({}, personaAttribute, {
        value,
      });

      const newPersonaAttributes: Attribute[] = [
        ...config.state.personaAttributes.slice(
          0,
          ((personaAttributeIndex > -1) ? personaAttributeIndex : undefined),
        ),
        newPersonaAttribute,
        ...((personaAttributeIndex > -1) ?
          config.state.personaAttributes.slice(personaAttributeIndex + 1) :
            []),
      ];

      config.state.personaAttributes = newPersonaAttributes;

      return {
        attribute: newPersonaAttribute,
      };
    };
};
