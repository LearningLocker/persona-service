import type Identifier from '../../models/Identifier';

interface Result {
  readonly identifier: Identifier;
  readonly wasCreated: boolean;
}

export default Result;
