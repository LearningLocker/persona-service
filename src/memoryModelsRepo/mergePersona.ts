import MergePersonaOptions from '../repoFactory/options/MergePersonaOptions';
import MergePersonaResult from '../repoFactory/results/MergePersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: MergePersonaOptions): Promise<MergePersonaResult> => {

    const toUpdateIdentifiers = config.state.personaIdentifiers.filter(
      (identifier) => identifier.persona === opts.fromPersonaId,
    );

    const toUpdateIdentifierIds = toUpdateIdentifiers.map(({id}) => id);

    const newPersonaIdentifiers = config.state.personaIdentifiers.map((identifier) => {
      if (identifier.persona === opts.fromPersonaId) {
        return {
          ...identifier,
          persona: opts.toPersonaId,
        };
      }
      return identifier;
    });

    config.state.personaIdentifiers = newPersonaIdentifiers;

    const toUpdateAttributes = config.state.personaAttributes.filter(
      (attribute) => attribute.personaId === opts.fromPersonaId,
    );

    const toUpdateAttributeIds = toUpdateAttributes.map(({id}) => id);

    const newPersonaAttributes = config.state.personaAttributes.map((attribute) => {
      if (attribute.personaId === opts.fromPersonaId) {
        return {
          ...attribute,
          personaId: opts.toPersonaId,
        };
      }
      return attribute;
    });

    config.state.personaAttributes = newPersonaAttributes;

    return {identifierIds: toUpdateIdentifierIds, attributeIds: toUpdateAttributeIds};
  };
};
