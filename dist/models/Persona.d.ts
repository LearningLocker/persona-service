import BaseModel from './BaseModel';
interface PersonaModel extends BaseModel {
    readonly organisation: string;
    readonly name?: string;
}
export default PersonaModel;
