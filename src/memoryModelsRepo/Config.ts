/* tslint:disable:readonly-keyword */
import Identifier from '../models/Identifier';
import Persona from '../models/Persona';

interface State {
  personaIdentifiers: Identifier[];
  personas: Persona[];
}

interface Config {
  state: State;
}

export default Config;
