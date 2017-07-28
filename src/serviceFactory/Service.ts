import CommonService from 'jscommons/dist/serviceFactory/Service';
import CreateIdentifierOptions from './options/CreateIdentifierOptions';
import CreatePersonaOptions from './options/CreatePersonaOptions';
import DeletePersonaOptions from './options/DeletePersonaOptions';
import DeleteProfileOptions from './options/DeleteProfileOptions';
import GetFullAgentOptions from './options/GetFullAgentOptions';
import GetIdentifierOptions from './options/GetIdentifierOptions';
import GetPersonaOptions from './options/GetPersonaOptions';
import GetProfileOptions from './options/GetProfileOptions';
import GetProfilesOptions from './options/GetProfilesOptions';
import MergePersonaOptions from './options/MergePersonaOptions';
import OverwriteProfileOptions from './options/OverwriteProfileOptions';
import PatchProfileOptions from './options/PatchProfileOptions';
import CreateIdentifierResult from './results/CreateIdentifierResult';
import CreatePersonaResult from './results/CreatePersonaResult';
import GetFullAgentResult from './results/GetFullAgentResult';
import GetIdentifierResult from './results/GetIdentifierResult';
import GetPersonaResult from './results/GetPersonaResult';
import GetProfileResult from './results/GetProfileResult';
import GetProfilesResult from './results/GetProfilesResult';
import MergePersonaResult from './results/MergePersonaResult';

interface Service extends CommonService {
  readonly createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  readonly createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  readonly deletePersona: (opts: DeletePersonaOptions) => Promise<void>;
  readonly deleteProfile: (opts: DeleteProfileOptions) => Promise<void>;
  readonly getFullAgent: (opts: GetFullAgentOptions) => Promise<GetFullAgentResult>;
  readonly getIdentifier: (opts: GetIdentifierOptions) => Promise<GetIdentifierResult>;
  readonly getPersona: (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
  readonly getProfile: (opts: GetProfileOptions) => Promise<GetProfileResult>;
  readonly getProfiles: (opts: GetProfilesOptions) => Promise<GetProfilesResult>;
  readonly mergePersona: (opts: MergePersonaOptions) => Promise<MergePersonaResult>;
  readonly overwriteProfile: (opts: OverwriteProfileOptions) => Promise<void>;
  readonly patchProfile: (opts: PatchProfileOptions) => Promise<void>;
}

export default Service;
