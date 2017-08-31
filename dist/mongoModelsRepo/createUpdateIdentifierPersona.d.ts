import CreateUpdateIdentifierPersonaOptions from '../repoFactory/options/CreateUpdateIdentifierPersonaOptions';
import GetIdentifierOptions from '../repoFactory/options/GetIdentifierOptions';
import CreateUpdateIdentifierPersonaResult from '../repoFactory/results/CreateUpdateIdentifierPersonaResult';
import GetIdentifierResult from '../repoFactory/results/GetIdentifierResult';
import Lockable from '../repoFactory/utils/Lockable';
import Config from './Config';
declare const retryCreateUpdateIdentifierPersona: (config: Config) => (opts: CreateUpdateIdentifierPersonaOptions & {
    readonly getIdentifier?: ((opts: GetIdentifierOptions) => Promise<GetIdentifierResult & Lockable>) | undefined;
}) => Promise<CreateUpdateIdentifierPersonaResult>;
export default retryCreateUpdateIdentifierPersona;
