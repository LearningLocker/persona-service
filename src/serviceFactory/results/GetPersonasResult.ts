import Persona from '../../models/Persona';

export default interface GetPersonaResult {
  readonly personas: Persona[];
}
