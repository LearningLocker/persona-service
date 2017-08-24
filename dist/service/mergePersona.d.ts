import MergePersonaOptions from '../serviceFactory/options/MergePersonaOptions';
import MergePersonaResult from '../serviceFactory/results/MergePersonaResult';
import Config from './Config';
declare const _default: (config: Config) => ({fromPersonaId, organisation, toPersonaId}: MergePersonaOptions) => Promise<MergePersonaResult>;
export default _default;
