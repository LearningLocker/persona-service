import Identifier from '../../models/Identifier';

interface Result {
  readonly identifiersCreationResult: {
    identifier: Identifier;
    wasCreated: boolean;
  }[];
}

export default Result;
