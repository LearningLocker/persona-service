import Lockable from '../utils/Lockable';
interface SetIdentifierPersonaOptions extends Lockable {
    readonly id: string;
    readonly persona: string;
    readonly organisation: string;
}
export default SetIdentifierPersonaOptions;
