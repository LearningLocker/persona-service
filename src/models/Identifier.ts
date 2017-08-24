import BaseModel from './BaseModel';
import Ifi from './Ifi';

interface Identifier extends BaseModel {
  readonly organisation: string;
  readonly persona?: string;
  readonly ifi: Ifi;
}

export default Identifier;
