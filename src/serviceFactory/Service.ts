import CommonService from 'jscommons/dist/serviceFactory/Service';
import DeleteAgentProfileOptions from './options/DeleteAgentProfileOptions';
import GetAgentProfileOptions from './options/GetAgentProfileOptions';
import GetAgentProfilesOptions from './options/GetAgentProfilesOptions';
import OverwriteAgentProfileOptions from './options/OverwriteAgentProfileOptions';
import PatchAgentProfileOptions from './options/PatchAgentProfileOptions';
import GetAgentProfileResult from './results/GetAgentProfileResult';
import GetAgentProfilesResult from './results/GetAgentProfilesResult';

interface Service extends CommonService {
  deleteAgentProfile: (opts: DeleteAgentProfileOptions) => Promise<void>;
  getAgentProfile: (opts: GetAgentProfileOptions) => Promise<GetAgentProfileResult>;
  getAgentProfiles: (opts: GetAgentProfilesOptions) => Promise<GetAgentProfilesResult>;
  overwriteAgentProfile: (opts: OverwriteAgentProfileOptions) => Promise<void>;
  patchAgentProfile: (opts: PatchAgentProfileOptions) => Promise<void>;
}

export default Service;
