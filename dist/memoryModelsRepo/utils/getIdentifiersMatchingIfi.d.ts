import Identifier from '../../models/Identifier';
import Ifi from '../../models/Ifi';
import Lockable from '../../repoFactory/utils/Lockable';
import Config from '../Config';
export interface Options {
    readonly organisation: string;
    readonly config: Config;
    readonly ifi: Ifi;
}
declare const _default: ({config, organisation, ifi}: Options) => (Identifier & Lockable)[];
export default _default;
