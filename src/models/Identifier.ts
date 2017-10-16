import BaseModel from './BaseModel';
import Ifi from './Ifi';

interface Identifier extends BaseModel {
  // Identifier should allways have a persona. It's optional as the persona will be created after
  readonly persona?: string;
  readonly ifi: Ifi;
}

export default Identifier;
