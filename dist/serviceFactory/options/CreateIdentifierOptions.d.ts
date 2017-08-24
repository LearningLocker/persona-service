import Ifi from '../../models/Ifi';
interface CreateIdentifierOptions {
    readonly organisation: string;
    readonly ifi: Ifi;
    readonly persona: string;
}
export default CreateIdentifierOptions;
