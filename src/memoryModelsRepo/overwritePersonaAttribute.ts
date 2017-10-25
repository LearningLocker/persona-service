import { findIndex } from 'lodash';
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

const updatePersonaAttribute = ({
  personaAttributes,
  newPersonaAttribute,
  index,
}: {
  readonly index: number;
  readonly personaAttributes: Attribute[];
  readonly newPersonaAttribute: Attribute;
}) => {
  return [
    ...personaAttributes.slice(
      0,
      index,
    ),
    newPersonaAttribute,
    ...personaAttributes.slice(index + 1),
  ];
};

const addNewPersonaAttribute = ({
  personaAttributes,
  newPersonaAttribute,
}: {
  readonly personaAttributes: Attribute[];
  readonly newPersonaAttribute: Attribute;
}) => {
  return [...personaAttributes, newPersonaAttribute];
};

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

      const isAlreadyStored = personaAttributeIndex !== -1;

      const personaAttribute = (isAlreadyStored) ?
        config.state.personaAttributes[personaAttributeIndex] :
          {
            id: uuid(),
            key,
            organisation,
            personaId,
          };

      const newPersonaAttribute: Attribute = {
        ...personaAttribute,
        value,
      };

      const newPersonaAttributes: Attribute[] = (isAlreadyStored) ?
        updatePersonaAttribute({
          index: personaAttributeIndex,
          newPersonaAttribute,
          personaAttributes: config.state.personaAttributes,
        }) :
          addNewPersonaAttribute({
            newPersonaAttribute,
            personaAttributes: config.state.personaAttributes,
          });

      config.state.personaAttributes = newPersonaAttributes;

      return {
        attribute: newPersonaAttribute,
      };
    };
};
