import Ifi from '../../models/Ifi';
import Lockable from '../utils/Lockable';

interface Options extends Lockable {
  readonly organisation: string;
  readonly ifi: Ifi;
  readonly persona: string;
}

export default Options;
