import NoModelWithId from '../errors/NoModelWithId';
import DeletePersonaAttributeOptions from '../repoFactory/options/DeletePersonaAttributeOptions';
import _DeletePersonaAttributeOptions from // tslint:disable-line:no-unused import-spacing
  '../serviceFactory/options/DeletePersonaAttributeOptions';
import Config from './Config';

export default (config: Config) => {
  return async ({
    id,
    organisation,
  }: DeletePersonaAttributeOptions): Promise<void> => {

    const remainingAttributes = config.state.personaAttributes.filter((attribute) => {
      return !(
        attribute.id === id &&
        attribute.organisation === organisation
      );
    });

    if (remainingAttributes.length === config.state.personaAttributes.length) {
      throw new NoModelWithId('attribute', id);
    }

    config.state.personaAttributes = remainingAttributes;
  };
};
