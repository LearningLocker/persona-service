import CommonService from 'jscommons/dist/serviceFactory/Service';
import DeleteProfileOptions from './options/DeleteProfileOptions';
import GetFullAgentOptions from './options/GetFullAgentOptions';
import GetProfileOptions from './options/GetProfileOptions';
import GetProfilesOptions from './options/GetProfilesOptions';
import OverwriteProfileOptions from './options/OverwriteProfileOptions';
import PatchProfileOptions from './options/PatchProfileOptions';
import GetFullAgentResult from './results/GetFullAgentResult';
import GetProfileResult from './results/GetProfileResult';
import GetProfilesResult from './results/GetProfilesResult';

interface Service extends CommonService {
  readonly deleteProfile: (opts: DeleteProfileOptions) => Promise<void>;
  readonly getFullAgent: (opts: GetFullAgentOptions) => Promise<GetFullAgentResult>;
  readonly getProfile: (opts: GetProfileOptions) => Promise<GetProfileResult>;
  readonly getProfiles: (opts: GetProfilesOptions) => Promise<GetProfilesResult>;
  readonly overwriteProfile: (opts: OverwriteProfileOptions) => Promise<void>;
  readonly patchProfile: (opts: PatchProfileOptions) => Promise<void>;
}

export default Service;
