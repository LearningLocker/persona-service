import CommonService from 'jscommons/dist/serviceFactory/Service';
import CreateIdentifierOptions from './options/CreateIdentifierOptions';
import CreatePersonaOptions from './options/CreatePersonaOptions';
import CreateUpdateIdentifierPersonaOptions from './options/CreateUpdateIdentifierPersonaOptions';
import DeletePersonaAttributeOptions from './options/DeletePersonaAttributeOptions';
import DeletePersonaIdentifierOptions from './options/DeletePersonaIdentifierOptions';
import DeletePersonaOptions from './options/DeletePersonaOptions';
import GetAttributeOptions from './options/GetAttributeOptions';
import GetAttributesOptions from './options/GetAttributesOptions';
import GetIdentifierByIfiOptions from './options/GetIdentifierByIfiOptions';
import GetIdentifierOptions from './options/GetIdentifierOptions';
import GetIdentifiersOptions from './options/GetIdentifiersOptions';
import GetIfisByPersonaOptions from './options/GetIfisByPersonaOptions';
import GetPersonaAttributeCountOptions from './options/GetPersonaAttributeCountOptions';
import GetPersonaAttributesOptions from './options/GetPersonaAttributesOptions';
import GetPersonaCountOptions from './options/GetPersonaCountOptions';
import GetPersonaIdentifierCountOptions from './options/GetPersonaIdentifierCountOptions';
import GetPersonaIdentifiersOptions from './options/GetPersonaIdentifiersOptions';
import GetPersonaOptions from './options/GetPersonaOptions';
import GetPersonasConnectionOptions from './options/GetPersonasConnectionOptions';
import GetPersonasOptions from './options/GetPersonasOptions';
import MergePersonaOptions from './options/MergePersonaOptions';
import OverwriteIdentifierOptions from './options/OverwriteIdentifierOptions';
import OverwritePersonaAttributeOptions from './options/OverwritePersonaAttributeOptions';
import SetIdentifierPersonaOptions from './options/SetIdentifierPersonaOptions';
import UpdateIdentifierOptions from './options/UpdateIdentifierOptions';
import UpdatePersonaOptions from './options/UpdatePersonaOptions';
import CreateIdentifierResult from './results/CreateIdentifierResult';
import CreatePersonaResult from './results/CreatePersonaResult';
import CreateUpdateIdentifierPersonaResult from './results/CreateUpdateIdentifierPersonaResult';
import GetAttributeResult from './results/GetAttributeResult';
import GetAttributesResult from './results/GetAttributesResult';
import GetIdentifierByIfiResult from './results/GetIdentifierByIfiResult';
import GetIdentifierResult from './results/GetIdentifierResult';
import GetIdentifiersResult from './results/GetIdentifiersResult';
import GetIfisByPersonaResult from './results/GetIfisByPersonaResult';
import GetPersonaAttributeCountResult from './results/GetPersonaAttributeCountResult';
import GetPersonaAttributesResult from './results/GetPersonaAttributesResult';
import GetPersonaCountResult from './results/GetPersonaCountResult';
import GetPersonaIdentifierCountResult from './results/GetPersonaIdentifierCountResult';
import GetPersonaIdentifiersResult from './results/GetPersonaIdentifiersResult';
import GetPersonaResult from './results/GetPersonaResult';
import GetPersonasConnectionResult from './results/GetPersonasConnectionResult';
import GetPersonasResult from './results/GetPersonasResult';
import MergePersonaResult from './results/MergePersonaResult';
import OverwriteIdentifierResult from './results/OverwriteIdentifierResult';
import OverwritePersonaAttributeResult from './results/OverwritePersonaAttributeResult';
import SetIdentifierPersonaResult from './results/SetIdentifierPersonaResult';
import UpdateIdentifierResult from './results/UpdateIdentifierResult';
import UpdatePersonaResult from './results/UpdatePersonaResult';

interface Service extends CommonService {
  readonly createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  readonly createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  readonly deletePersona: (opts: DeletePersonaOptions) => Promise<void>;
  readonly deletePersonaAttribute: (opts: DeletePersonaAttributeOptions) => Promise<void>;
  readonly deletePersonaIdentifier: (opts: DeletePersonaIdentifierOptions) => Promise<void>;
  readonly getIdentifier: (opts: GetIdentifierOptions) => Promise<GetIdentifierResult>;
  readonly getAttribute: (opts: GetAttributeOptions) => Promise<GetAttributeResult>;
  readonly getPersona: (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
  readonly getPersonas: (opts: GetPersonasOptions) => Promise<GetPersonasResult>;
  readonly mergePersona: (opts: MergePersonaOptions) => Promise<MergePersonaResult>;
  readonly getIdentifiers: (opts: GetIdentifiersOptions) => Promise<GetIdentifiersResult>;
  readonly getIdentifierByIfi: (opts: GetIdentifierByIfiOptions) =>
    Promise<GetIdentifierByIfiResult>;
  readonly getPersonasConnection: (opts: GetPersonasConnectionOptions) =>
    Promise<GetPersonasConnectionResult>;
  readonly getIfisByPersona: (opts: GetIfisByPersonaOptions) => Promise<GetIfisByPersonaResult>;
  readonly setIdentifierPersona: (opts: SetIdentifierPersonaOptions) =>
    Promise<SetIdentifierPersonaResult>;
  readonly overwriteIdentifier: (opt: OverwriteIdentifierOptions) =>
    Promise<OverwriteIdentifierResult>;
  readonly createUpdateIdentifierPersona: (opts: CreateUpdateIdentifierPersonaOptions) =>
    Promise<CreateUpdateIdentifierPersonaResult>;
  readonly overwritePersonaAttribute: (opts: OverwritePersonaAttributeOptions) =>
    Promise<OverwritePersonaAttributeResult>;
  readonly getPersonaAttributes: (opts: GetPersonaAttributesOptions) =>
  Promise<GetPersonaAttributesResult>;
  readonly getPersonaIdentifiers: (opts: GetPersonaIdentifiersOptions) =>
    Promise<GetPersonaIdentifiersResult>;
  readonly updatePersona: (opts: UpdatePersonaOptions) =>
    Promise<UpdatePersonaResult>;
  readonly getPersonaCount: (opts: GetPersonaCountOptions) => Promise<GetPersonaCountResult>;
  readonly getPersonaAttributeCount: (opts: GetPersonaAttributeCountOptions) =>
  Promise<GetPersonaAttributeCountResult>;
  readonly getPersonaIdentifierCount: (opts: GetPersonaIdentifierCountOptions) =>
    Promise<GetPersonaIdentifierCountResult>;
  readonly getAttributes: (opts: GetAttributesOptions) => Promise<GetAttributesResult>;
  readonly updateIdentifier: (opts: UpdateIdentifierOptions) => Promise<UpdateIdentifierResult>;
}

export default Service;
