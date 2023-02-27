import type BaseModel from './BaseModel';
import type Ifi from './Ifi';

interface Identifier extends BaseModel {
  // Identifier should allways have a persona. It's optional as the persona will be created after
  readonly persona?: string;
  readonly ifi: Ifi;
}

export interface IdentifierWithPersona extends Identifier {
  readonly persona: string;
}

export default Identifier;
