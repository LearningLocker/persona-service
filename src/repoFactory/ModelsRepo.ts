import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateIdentifierOptions from './options/CreateIdentifierOptions';
import CreatePersonaOptions from './options/CreatePersonaOptions';
import GetIdentifierByIfiOptions from './options/GetIdentifierByIfiOptions';
import GetProfileContentOptions from './options/GetProfileContentOptions';
import GetProfilesOptions from './options/GetProfilesOptions';
import OverwriteProfileOptions from './options/OverwriteProfileOptions';
import SetIdentifierPersonaOptions from './options/SetIdentifierPersonaOptions';
import CreateIdentifierResult from './results/CreateIdentifierResult';
import CreatePersonaResult from './results/CreatePersonaResult';
import GetIdentifierByIfiResult from './results/GetIdentifierByIfiResult';
import GetProfileContentResult from './results/GetProfileContentResult';
import GetProfilesResult from './results/GetProfilesResult';

interface Repo extends CommonRepo {
  createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  getIdentifierByIfi: (opts: GetIdentifierByIfiOptions) => Promise<GetIdentifierByIfiResult>;
  getProfileContent: (opts: GetProfileContentOptions) => Promise<GetProfileContentResult>;
  getProfiles: (opts: GetProfilesOptions) => Promise<GetProfilesResult>;
  overwriteProfile: (opts: OverwriteProfileOptions) => Promise<void>;
  setIdentifierPersona: (opts: SetIdentifierPersonaOptions) => Promise<void>;
}

export default Repo;
