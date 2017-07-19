import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateIdentifierOptions from './options/CreateIdentifierOptions';
import CreatePersonaOptions from './options/CreatePersonaOptions';
import DeleteProfileOptions from './options/DeleteProfileOptions';
import GetIdentifierByIfiOptions from './options/GetIdentifierByIfiOptions';
import GetProfileOptions from './options/GetProfileOptions';
import GetProfilesOptions from './options/GetProfilesOptions';
import OverwriteProfileOptions from './options/OverwriteProfileOptions';
import PatchProfileOptions from './options/PatchProfileOptions';
import SetIdentifierPersonaOptions from './options/SetIdentifierPersonaOptions';
import CreateIdentifierResult from './results/CreateIdentifierResult';
import CreatePersonaResult from './results/CreatePersonaResult';
import DeleteProfileResult from './results/DeleteProfileResult';
import GetIdentifierByIfiResult from './results/GetIdentifierByIfiResult';
import GetProfileResult from './results/GetProfileResult';
import GetProfilesResult from './results/GetProfilesResult';
import OverwriteProfileResult from './results/OverwriteProfileResult';

interface Repo extends CommonRepo {
  createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  deleteProfile: (opts: DeleteProfileOptions) => Promise<DeleteProfileResult>;
  getIdentifierByIfi: (opts: GetIdentifierByIfiOptions) => Promise<GetIdentifierByIfiResult>;
  getProfile: (opts: GetProfileOptions) => Promise<GetProfileResult>;
  getProfiles: (opts: GetProfilesOptions) => Promise<GetProfilesResult>;
  overwriteProfile: (opts: OverwriteProfileOptions) => Promise<OverwriteProfileResult>;
  patchProfile: (opts: PatchProfileOptions) => Promise<void>;
  setIdentifierPersona: (opts: SetIdentifierPersonaOptions) => Promise<void>;
}

export default Repo;
