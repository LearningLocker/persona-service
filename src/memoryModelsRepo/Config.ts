/* tslint:disable:readonly-keyword */
import Identifier from '../models/Identifier';
import Persona from '../models/Persona';
import Profile from '../models/Profile';

interface State {
  agentProfiles: Profile[];
  personaIdentifiers: Identifier[];
  personas: Persona[];
}

interface Config {
  state: State;
}

export default Config;
