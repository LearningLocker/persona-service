import type Ifi from '../../models/Ifi';

interface Options {
  readonly organisation: string;
  readonly ifi: Ifi;
  readonly persona: string;
}

export default Options;
