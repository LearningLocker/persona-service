import Persona from '../../models/Persona';

export default interface GetPersonasResult {
  readonly personas: Persona[];
}
