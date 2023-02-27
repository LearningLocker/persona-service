import type Attribute from '../../models/Attribute';

export default interface GetPersonaAttributesResult {
  readonly attributes: Attribute[];
}
