import Identifier from '../../models/Identifier';
import Ifi from '../../models/Ifi';
export interface Options {
    readonly organisation: string;
    readonly identifier: Identifier;
    readonly ifi: Ifi;
}
declare const _default: ({organisation, identifier, ifi}: Options) => boolean;
export default _default;
