import Ifi from '../../models/Ifi';
interface Options {
    readonly organisation: string;
    readonly ifis: Ifi[];
    readonly personaId: string;
}
export default Options;
