/* tslint:disable:readonly-keyword */
import BaseModel from '../models/BaseModel';
import Identifier from '../models/Identifier';
import Persona from '../models/Persona';

export interface BaseState {
  [key: string]: BaseModel[];
}

export interface State extends BaseState {
  personaIdentifiers: Identifier[];
  personas: Persona[];
}

interface Config {
  state: State;
}

export default Config;
