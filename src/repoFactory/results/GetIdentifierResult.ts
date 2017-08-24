import Identifier from '../../models/Identifier';
import Lockable from '../utils/Lockable';

interface Result extends Lockable {
  readonly identifier: Identifier;
}

export default Result;
