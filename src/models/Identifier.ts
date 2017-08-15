import Ifi from './Ifi';

interface Identifier {
  readonly id: string;
  readonly organisation: string;
  readonly persona?: string;
  readonly ifi: Ifi;
}

export default Identifier;
