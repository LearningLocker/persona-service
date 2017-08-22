import Identifier from '../../models/Identifier';
interface CreateIdentifierResult {
    readonly identifier: Identifier;
    readonly wasCreated: boolean;
}
export default CreateIdentifierResult;
