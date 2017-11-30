import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import UpdateIdentifierResult from '../serviceFactory/results/UpdateIdentifierResult';
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
import UpdatePersonaResult from './results/UpdatePersonaResult';

export default interface Repo extends CommonRepo {
  readonly createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  readonly createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  readonly deletePersonaAttribute: (opts: DeletePersonaAttributeOptions) => Promise<void>;
  readonly deletePersonaIdentifier: (opts: DeletePersonaIdentifierOptions) => Promise<void>;
  readonly deletePersona: (opts: DeletePersonaOptions) => Promise<void>;
  readonly getIdentifierByIfi:
    (opts: GetIdentifierByIfiOptions) => Promise<GetIdentifierByIfiResult>;
  readonly getIdentifier: (opt: GetIdentifierOptions) => Promise<GetIdentifierResult>;
  readonly getIfisByPersona: (opts: GetIfisByPersonaOptions) => Promise<GetIfisByPersonaResult>;
  readonly getPersona: (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
  readonly getPersonas: (opts: GetPersonasOptions) => Promise<GetPersonasResult>;
  readonly getPersonasConnection:
  (opts: GetPersonasConnectionOptions) => Promise<GetPersonasConnectionResult>;
  readonly overwriteIdentifier:
    (opts: OverwriteIdentifierOptions) => Promise<OverwriteIdentifierResult>;
  readonly setIdentifierPersona: (opts: SetIdentifierPersonaOptions) =>
    Promise<SetIdentifierPersonaResult>;
  readonly getAttribute: (opts: GetAttributeOptions) =>
    Promise<GetAttributeResult>;
  readonly mergePersona: (opts: MergePersonaOptions) => Promise<MergePersonaResult>;
  readonly getIdentifiers: (opts: GetIdentifiersOptions) => Promise<GetIdentifiersResult>;
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
  readonly getPersonaIdentifierCount: (opts: GetPersonaIdentifierCountOptions) =>
    Promise<GetPersonaIdentifierCountResult>;
  readonly getPersonaAttributeCount: (opts: GetPersonaAttributeCountOptions) =>
    Promise<GetPersonaAttributeCountResult>;
  readonly getAttributes: (opts: GetAttributesOptions) => Promise<GetAttributesResult>;
  readonly updateIdentifier: (opts: UpdateIdentifierOptions) => Promise<UpdateIdentifierResult>;
}
