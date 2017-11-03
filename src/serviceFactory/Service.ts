import CommonService from 'jscommons/dist/serviceFactory/Service';
import CreateIdentifierOptions from './options/CreateIdentifierOptions';
import CreatePersonaOptions from './options/CreatePersonaOptions';
import CreateUpdateIdentifierPersonaOptions from './options/CreateUpdateIdentifierPersonaOptions';
import DeletePersonaOptions from './options/DeletePersonaOptions';
import GetAttributesOptions from './options/GetAttributesOptions';
import GetIdentifierByIfiOptions from './options/GetIdentifierByIfiOptions';
import GetIdentifierOptions from './options/GetIdentifierOptions';
import GetIdentifiersOptions from './options/GetIdentifiersOptions';
import GetIfisByPersonaOptions from './options/GetIfisByPersonaOptions';
import GetPersonaAttributesOptions from './options/GetPersonaAttributesOptions';
import GetPersonaCountOptions from './options/GetPersonaCountOptions';
import GetPersonaOptions from './options/GetPersonaOptions';
import GetPersonasOptions from './options/GetPersonasOptions';
import MergePersonaOptions from './options/MergePersonaOptions';
import OverwriteIdentifierOptions from './options/OverwriteIdentifierOptions';
import OverwritePersonaAttributeOptions from './options/OverwritePersonaAttributeOptions';
import SetIdentifierPersonaOptions from './options/SetIdentifierPersonaOptions';
import UpdatePersonaOptions from './options/UpdatePersonaOptions';
import CreateIdentifierResult from './results/CreateIdentifierResult';
import CreatePersonaResult from './results/CreatePersonaResult';
import CreateUpdateIdentifierPersonaResult from './results/CreateUpdateIdentifierPersonaResult';
import GetAttributesResult from './results/GetAttributesResult';
import GetIdentifierByIfiResult from './results/GetIdentifierByIfiResult';
import GetIdentifierResult from './results/GetIdentifierResult';
import GetIdentifiersResult from './results/GetIdentifiersResult';
import GetIfisByPersonaResult from './results/GetIfisByPersonaResult';
import GetPersonaAttributesResult from './results/GetPersonaAttributesResult';
import GetPersonaCountResult from './results/GetPersonaCountResult';
import GetPersonaResult from './results/GetPersonaResult';
import GetPersonasResult from './results/GetPersonasResult';
import MergePersonaResult from './results/MergePersonaResult';
import OverwriteIdentifierResult from './results/OverwriteIdentifierResult';
import OverwritePersonaAttributeResult from './results/OverwritePersonaAttributeResult';
import SetIdentifierPersonaResult from './results/SetIdentifierPersonaResult';
import UpdatePersonaResult from './results/UpdatePersonaResult';

interface Service extends CommonService {
  readonly createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  readonly createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  readonly deletePersona: (opts: DeletePersonaOptions) => Promise<void>;
  readonly getIdentifier: (opts: GetIdentifierOptions) => Promise<GetIdentifierResult>;
  readonly getPersona: (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
  readonly mergePersona: (opts: MergePersonaOptions) => Promise<MergePersonaResult>;
  readonly getIdentifiers: (opts: GetIdentifiersOptions) => Promise<GetIdentifiersResult>;
  readonly getIdentifierByIfi: (opts: GetIdentifierByIfiOptions) =>
    Promise<GetIdentifierByIfiResult>;
  readonly getPersonas: (opts: GetPersonasOptions) => Promise<GetPersonasResult>;
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
  readonly updatePersona: (opts: UpdatePersonaOptions) =>
    Promise<UpdatePersonaResult>;
  readonly getPersonaCount: (opts: GetPersonaCountOptions) => Promise<GetPersonaCountResult>;
  readonly getAttributes: (opts: GetAttributesOptions) => Promise<GetAttributesResult>;
}

export default Service;
