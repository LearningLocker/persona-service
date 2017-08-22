import Identifier from '../../models/Identifier';
import Config from '../Config';
export interface GetPersonaIdFromIdentifierOptions {
    readonly organisation: string;
    readonly config: Config;
    readonly identifier: Identifier;
    readonly wasCreated: boolean;
}
declare const getPersonaIdFromIdentifier: ({organisation, config, identifier, wasCreated}: GetPersonaIdFromIdentifierOptions) => Promise<string>;
export default getPersonaIdFromIdentifier;
