import type CommonService from 'jscommons/dist/serviceFactory/Service';
import type CreateIdentifierOptions from './options/CreateIdentifierOptions';
import type CreatePersonaOptions from './options/CreatePersonaOptions';
import type CreateUpdateIdentifierPersonaOptions from './options/CreateUpdateIdentifierPersonaOptions';
import type DeletePersonaAttributeOptions from './options/DeletePersonaAttributeOptions';
import type DeletePersonaIdentifierOptions from './options/DeletePersonaIdentifierOptions';
import type DeletePersonaOptions from './options/DeletePersonaOptions';
import type GetAttributeOptions from './options/GetAttributeOptions';
import type GetAttributesOptions from './options/GetAttributesOptions';
import type GetIdentifierByIfiOptions from './options/GetIdentifierByIfiOptions';
import type GetIdentifierOptions from './options/GetIdentifierOptions';
import type GetIdentifiersOptions from './options/GetIdentifiersOptions';
import type GetIfisByPersonaOptions from './options/GetIfisByPersonaOptions';
import type GetPersonaAttributeCountOptions from './options/GetPersonaAttributeCountOptions';
import type GetPersonaAttributesOptions from './options/GetPersonaAttributesOptions';
import type GetPersonaCountOptions from './options/GetPersonaCountOptions';
import type GetPersonaIdentifierCountOptions from './options/GetPersonaIdentifierCountOptions';
import type GetPersonaIdentifiersOptions from './options/GetPersonaIdentifiersOptions';
import type GetPersonaOptions from './options/GetPersonaOptions';
import type GetPersonasConnectionOptions from './options/GetPersonasConnectionOptions';
import type GetPersonasOptions from './options/GetPersonasOptions';
import type MergePersonaOptions from './options/MergePersonaOptions';
import type OverwriteIdentifierOptions from './options/OverwriteIdentifierOptions';
import type OverwritePersonaAttributeOptions from './options/OverwritePersonaAttributeOptions';
import type SetIdentifierPersonaOptions from './options/SetIdentifierPersonaOptions';
import type UpdateIdentifierOptions from './options/UpdateIdentifierOptions';
import type UpdatePersonaOptions from './options/UpdatePersonaOptions';
import type CreateIdentifierResult from './results/CreateIdentifierResult';
import type CreatePersonaResult from './results/CreatePersonaResult';
import type CreateUpdateIdentifierPersonaResult from './results/CreateUpdateIdentifierPersonaResult';
import type GetAttributeResult from './results/GetAttributeResult';
import type GetAttributesResult from './results/GetAttributesResult';
import type GetIdentifierByIfiResult from './results/GetIdentifierByIfiResult';
import type GetIdentifierResult from './results/GetIdentifierResult';
import type GetIdentifiersResult from './results/GetIdentifiersResult';
import type GetIfisByPersonaResult from './results/GetIfisByPersonaResult';
import type GetPersonaAttributeCountResult from './results/GetPersonaAttributeCountResult';
import type GetPersonaAttributesResult from './results/GetPersonaAttributesResult';
import type GetPersonaCountResult from './results/GetPersonaCountResult';
import type GetPersonaIdentifierCountResult from './results/GetPersonaIdentifierCountResult';
import type GetPersonaIdentifiersResult from './results/GetPersonaIdentifiersResult';
import type GetPersonaResult from './results/GetPersonaResult';
import type GetPersonasConnectionResult from './results/GetPersonasConnectionResult';
import type GetPersonasResult from './results/GetPersonasResult';
import type MergePersonaResult from './results/MergePersonaResult';
import type OverwriteIdentifierResult from './results/OverwriteIdentifierResult';
import type OverwritePersonaAttributeResult from './results/OverwritePersonaAttributeResult';
import type SetIdentifierPersonaResult from './results/SetIdentifierPersonaResult';
import type UpdateIdentifierResult from './results/UpdateIdentifierResult';
import type UpdatePersonaResult from './results/UpdatePersonaResult';

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
  readonly getIdentifierByIfi: (opts: GetIdentifierByIfiOptions) => Promise<GetIdentifierByIfiResult>;
  readonly getPersonasConnection: (opts: GetPersonasConnectionOptions) => Promise<GetPersonasConnectionResult>;
  readonly getIfisByPersona: (opts: GetIfisByPersonaOptions) => Promise<GetIfisByPersonaResult>;
  readonly setIdentifierPersona: (opts: SetIdentifierPersonaOptions) => Promise<SetIdentifierPersonaResult>;
  readonly overwriteIdentifier: (opt: OverwriteIdentifierOptions) => Promise<OverwriteIdentifierResult>;
  readonly createUpdateIdentifierPersona: (opts: CreateUpdateIdentifierPersonaOptions) => Promise<CreateUpdateIdentifierPersonaResult>;
  readonly overwritePersonaAttribute: (opts: OverwritePersonaAttributeOptions) => Promise<OverwritePersonaAttributeResult>;
  readonly getPersonaAttributes: (opts: GetPersonaAttributesOptions) => Promise<GetPersonaAttributesResult>;
  readonly getPersonaIdentifiers: (opts: GetPersonaIdentifiersOptions) => Promise<GetPersonaIdentifiersResult>;
  readonly updatePersona: (opts: UpdatePersonaOptions) => Promise<UpdatePersonaResult>;
  readonly getPersonaCount: (opts: GetPersonaCountOptions) => Promise<GetPersonaCountResult>;
  readonly getPersonaAttributeCount: (opts: GetPersonaAttributeCountOptions) => Promise<GetPersonaAttributeCountResult>;
  readonly getPersonaIdentifierCount: (opts: GetPersonaIdentifierCountOptions) => Promise<GetPersonaIdentifierCountResult>;
  readonly getAttributes: (opts: GetAttributesOptions) => Promise<GetAttributesResult>;
  readonly updateIdentifier: (opts: UpdateIdentifierOptions) => Promise<UpdateIdentifierResult>;
}

export default Service;
