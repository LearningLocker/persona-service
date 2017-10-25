import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateIdentifierOptions from './options/CreateIdentifierOptions';
import CreatePersonaOptions from './options/CreatePersonaOptions';
import CreateUpdateIdentifierPersonaOptions from './options/CreateUpdateIdentifierPersonaOptions';
import DeletePersonaOptions from './options/DeletePersonaOptions';
import GetIdentifierByIfiOptions from './options/GetIdentifierByIfiOptions';
import GetIdentifierOptions from './options/GetIdentifierOptions';
import GetIdentifiersOptions from './options/GetIdentifiersOptions';
import GetIfisByPersonaOptions from './options/GetIfisByPersonaOptions';
import GetPersonaAttributesOptions from './options/GetPersonaAttributesOptions';
import GetPersonaOptions from './options/GetPersonaOptions';
import GetPersonasOptions from './options/GetPersonasOptions';
import MergePersonaOptions from './options/MergePersonaOptions';
import OverwriteIdentifierOptions from './options/OverwriteIdentifierOptions';
import OverwritePersonaAttributeOptions from './options/OverwritePersonaAttributeOptions';
import SetIdentifierPersonaOptions from './options/SetIdentifierPersonaOptions';
import CreateIdentifierResult from './results/CreateIdentifierResult';
import CreatePersonaResult from './results/CreatePersonaResult';
import CreateUpdateIdentifierPersonaResult from './results/CreateUpdateIdentifierPersonaResult';
import GetIdentifierByIfiResult from './results/GetIdentifierByIfiResult';
import GetIdentifierResult from './results/GetIdentifierResult';
import GetIdentifiersResult from './results/GetIdentifiersResult';
import GetIfisByPersonaResult from './results/GetIfisByPersonaResult';
import GetPersonaAttributesResult from './results/GetPersonaAttributesResult';
import GetPersonaResult from './results/GetPersonaResult';
import GetPersonasResult from './results/GetPersonasResult';
import MergePersonaResult from './results/MergePersonaResult';
import OverwriteIdentifierResult from './results/OverwriteIdentifierResult';
import OverwritePersonaAttributeResult from './results/OverwritePersonaAttributeResult';
import SetIdentifierPersonaResult from './results/SetIdentifierPersonaResult';

export default interface Repo extends CommonRepo {
  readonly createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  readonly createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  readonly deletePersona: (opts: DeletePersonaOptions) => Promise<void>;
  readonly getIdentifierByIfi:
    (opts: GetIdentifierByIfiOptions) => Promise<GetIdentifierByIfiResult>;
  readonly getIdentifier: (opt: GetIdentifierOptions) => Promise<GetIdentifierResult>;
  readonly getIfisByPersona: (opts: GetIfisByPersonaOptions) => Promise<GetIfisByPersonaResult>;
  readonly getPersona: (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
  readonly getPersonas: (opts: GetPersonasOptions) => Promise<GetPersonasResult>;
  readonly overwriteIdentifier:
    (opts: OverwriteIdentifierOptions) => Promise<OverwriteIdentifierResult>;
  readonly setIdentifierPersona: (opts: SetIdentifierPersonaOptions) =>
    Promise<SetIdentifierPersonaResult>;
  readonly mergePersona: (opts: MergePersonaOptions) => Promise<MergePersonaResult>;
  readonly getIdentifiers: (opts: GetIdentifiersOptions) => Promise<GetIdentifiersResult>;
  readonly createUpdateIdentifierPersona: (opts: CreateUpdateIdentifierPersonaOptions) =>
    Promise<CreateUpdateIdentifierPersonaResult>;
  readonly overwritePersonaAttribute: (opts: OverwritePersonaAttributeOptions) =>
    Promise<OverwritePersonaAttributeResult>;
  readonly getPersonaAttributes: (opts: GetPersonaAttributesOptions) =>
    Promise<GetPersonaAttributesResult>;
}
