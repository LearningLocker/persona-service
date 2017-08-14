import CommonService from 'jscommons/dist/serviceFactory/Service';
import CreateIdentifierOptions from './options/CreateIdentifierOptions';
import CreatePersonaOptions from './options/CreatePersonaOptions';
import DeletePersonaOptions from './options/DeletePersonaOptions';
import GetIdentifierOptions from './options/GetIdentifierOptions';
import GetPersonaOptions from './options/GetPersonaOptions';
import MergePersonaOptions from './options/MergePersonaOptions';
import UploadProfilesOptions from './options/UploadProfilesOptions';
import CreateIdentifierResult from './results/CreateIdentifierResult';
import CreatePersonaResult from './results/CreatePersonaResult';
import GetIdentifierResult from './results/GetIdentifierResult';
import GetPersonaResult from './results/GetPersonaResult';
import MergePersonaResult from './results/MergePersonaResult';
import UploadProfilesResult from './results/UploadProfilesResult';

interface Service extends CommonService {
  readonly createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  readonly createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  readonly deletePersona: (opts: DeletePersonaOptions) => Promise<void>;
  readonly getIdentifier: (opts: GetIdentifierOptions) => Promise<GetIdentifierResult>;
  readonly getPersona: (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
  readonly mergePersona: (opts: MergePersonaOptions) => Promise<MergePersonaResult>;
  readonly uploadProfiles: (opts: UploadProfilesOptions) => Promise<UploadProfilesResult>;
}

export default Service;
