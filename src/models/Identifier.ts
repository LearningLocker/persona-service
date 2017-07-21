import Ifi from './Ifi';

interface Model {
  readonly id: string;
  readonly organisation: string;
  readonly persona?: string;
  readonly ifi: Ifi;
}

export default Model;
