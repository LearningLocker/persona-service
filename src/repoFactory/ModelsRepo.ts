import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateIdentifierOptions from './options/CreateIdentifierOptions';
import CreatePersonaOptions from './options/CreatePersonaOptions';
import DeleteProfileOptions from './options/DeleteProfileOptions';
import GetIdentifierByIfiOptions from './options/GetIdentifierByIfiOptions';
import GetIfisByPersonaOptions from './options/GetIfisByPersonaOptions';
import GetPersonaOptions from './options/GetPersonaOptions';
import GetProfileOptions from './options/GetProfileOptions';
import GetProfilesOptions from './options/GetProfilesOptions';
import OverwriteProfileOptions from './options/OverwriteProfileOptions';
import PatchProfileOptions from './options/PatchProfileOptions';
import SetIdentifierPersonaOptions from './options/SetIdentifierPersonaOptions';
import CreateIdentifierResult from './results/CreateIdentifierResult';
import CreatePersonaResult from './results/CreatePersonaResult';
import DeleteProfileResult from './results/DeleteProfileResult';
import GetIdentifierByIfiResult from './results/GetIdentifierByIfiResult';
import GetIfisByPersonaResult from './results/GetIfisByPersonaResult';
import GetPersonaResult from './results/GetPersonaResult';
import GetProfileResult from './results/GetProfileResult';
import GetProfilesResult from './results/GetProfilesResult';
import OverwriteProfileResult from './results/OverwriteProfileResult';

interface Repo extends CommonRepo {
  readonly createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  readonly createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  readonly deleteProfile: (opts: DeleteProfileOptions) => Promise<DeleteProfileResult>;
  readonly getIdentifierByIfi:
    (opts: GetIdentifierByIfiOptions) => Promise<GetIdentifierByIfiResult>;
  readonly getIfisByPersona: (opts: GetIfisByPersonaOptions) => Promise<GetIfisByPersonaResult>;
  readonly getPersona: (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
  readonly getProfile: (opts: GetProfileOptions) => Promise<GetProfileResult>;
  readonly getProfiles: (opts: GetProfilesOptions) => Promise<GetProfilesResult>;
  readonly overwriteProfile: (opts: OverwriteProfileOptions) => Promise<OverwriteProfileResult>;
  readonly patchProfile: (opts: PatchProfileOptions) => Promise<void>;
  readonly setIdentifierPersona: (opts: SetIdentifierPersonaOptions) => Promise<void>;
}

export default Repo;
