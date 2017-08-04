import Identifier from '../../models/Identifier';

interface Result {
  readonly identifiersCreationResult: {
    readonly identifier: Identifier;
    readonly wasCreated: boolean;
  }[];
}

export default Result;
