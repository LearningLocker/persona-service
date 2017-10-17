import BaseModel from './BaseModel';

interface PersonaModel extends BaseModel {
  readonly name?: string;
}

export default PersonaModel;
