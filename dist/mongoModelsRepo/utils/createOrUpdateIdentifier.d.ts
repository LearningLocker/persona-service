import OverwriteIdentifierResult from '../../repoFactory/results/OverwriteIdentifierResult';
import Config from '../Config';
export interface CreateOrUpdateIdentifierOptions {
    readonly filter: object;
    readonly update: object;
    readonly upsert: boolean;
}
declare const createOrUpdateIdentifier: (config: Config) => ({filter, update, upsert}: CreateOrUpdateIdentifierOptions) => Promise<OverwriteIdentifierResult>;
export default createOrUpdateIdentifier;
