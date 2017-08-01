import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateIdentifierOptions from './options/CreateIdentifierOptions';
import CreateIdentifiersOptions from './options/CreateIdentifiersOptions';
import CreatePersonaOptions from './options/CreatePersonaOptions';
import DeletePersonaOptions from './options/DeletePersonaOptions';
import DeleteProfileOptions from './options/DeleteProfileOptions';
import GetIdentifierByIfiOptions from './options/GetIdentifierByIfiOptions';
import GetIdentifierOptions from './options/GetIdentifierOptions';
import GetIfisByPersonaOptions from './options/GetIfisByPersonaOptions';
import GetPersonaOptions from './options/GetPersonaOptions';
import GetProfileOptions from './options/GetProfileOptions';
import GetProfilesOptions from './options/GetProfilesOptions';
import MergePersonaOptions from './options/MergePersonaOptions';
import OverwriteIdentifierOptions from './options/OverwriteIdentifierOptions';
import OverwriteProfileOptions from './options/OverwriteProfileOptions';
import PatchProfileOptions from './options/PatchProfileOptions';
import SetIdentifierPersonaOptions from './options/SetIdentifierPersonaOptions';
import CreateIdentifierResult from './results/CreateIdentifierResult';
import CreateIdentifiersResult from './results/CreateIdentifiersResult';
import CreatePersonaResult from './results/CreatePersonaResult';
import DeleteProfileResult from './results/DeleteProfileResult';
import GetIdentifierByIfiResult from './results/GetIdentifierByIfiResult';
import GetIdentifierResult from './results/GetIdentifierResult';
import GetIfisByPersonaResult from './results/GetIfisByPersonaResult';
import GetPersonaResult from './results/GetPersonaResult';
import GetProfileResult from './results/GetProfileResult';
import GetProfilesResult from './results/GetProfilesResult';
import MergePersonaResult from './results/MergePersonaResult';
import OverwriteIdentifierResult from './results/OverwriteIdentifierResult';
import OverwriteProfileResult from './results/OverwriteProfileResult';

interface Repo extends CommonRepo {
  readonly createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  readonly createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  readonly deletePersona: (opts: DeletePersonaOptions) => Promise<void>;
  readonly deleteProfile: (opts: DeleteProfileOptions) => Promise<DeleteProfileResult>;
  readonly getIdentifierByIfi:
    (opts: GetIdentifierByIfiOptions) => Promise<GetIdentifierByIfiResult>;
  readonly getIdentifier: (opt: GetIdentifierOptions) => Promise<GetIdentifierResult>;
  readonly getIfisByPersona: (opts: GetIfisByPersonaOptions) => Promise<GetIfisByPersonaResult>;
  readonly getPersona: (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
  readonly getProfile: (opts: GetProfileOptions) => Promise<GetProfileResult>;
  readonly getProfiles: (opts: GetProfilesOptions) => Promise<GetProfilesResult>;
  readonly overwriteIdentifier:
    (opts: OverwriteIdentifierOptions) => Promise<OverwriteIdentifierResult>;
  readonly overwriteProfile: (opts: OverwriteProfileOptions) => Promise<OverwriteProfileResult>;
  readonly patchProfile: (opts: PatchProfileOptions) => Promise<void>;
  readonly setIdentifierPersona: (opts: SetIdentifierPersonaOptions) => Promise<void>;
  readonly mergePersona: (opts: MergePersonaOptions) => Promise<MergePersonaResult>;
  readonly createIdentifiers: (opts: CreateIdentifiersOptions) => Promise<CreateIdentifiersResult>;
}

export default Repo;
