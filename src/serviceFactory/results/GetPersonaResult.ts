import type Persona from '../../models/Persona';

export default interface GetPersonaResult {
  readonly persona: Persona;
}
