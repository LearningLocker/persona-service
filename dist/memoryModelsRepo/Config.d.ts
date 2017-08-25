import BaseModel from '../models/BaseModel';
import Identifier from '../models/Identifier';
import Persona from '../models/Persona';
import Lockable from '../repoFactory/utils/Lockable';
export interface BaseState {
    [key: string]: BaseModel[];
}
export interface State extends BaseState {
    personaIdentifiers: (Identifier & Lockable)[];
    personas: Persona[];
}
interface Config {
    state: State;
}
export default Config;
