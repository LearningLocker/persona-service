import CommonService from 'jscommons/dist/serviceFactory/Service';
import CreateIdentifierOptions from './options/CreateIdentifierOptions';
import CreatePersonaOptions from './options/CreatePersonaOptions';
import DeletePersonaOptions from './options/DeletePersonaOptions';
import GetIdentifierOptions from './options/GetIdentifierOptions';
import GetIdentifiersOptions from './options/GetIdentifiersOptions';
import GetPersonaOptions from './options/GetPersonaOptions';
import GetPersonasOptions from './options/GetPersonasOptions';
import MergePersonaOptions from './options/MergePersonaOptions';
import OverwriteIdentifierOptions from './options/OverwriteIdentifierOptions';
import CreateIdentifierResult from './results/CreateIdentifierResult';
import CreatePersonaResult from './results/CreatePersonaResult';
import GetIdentifierResult from './results/GetIdentifierResult';
import GetIdentifiersResult from './results/GetIdentifiersResult';
import GetPersonaResult from './results/GetPersonaResult';
import GetPersonasResult from './results/GetPersonasResult';
import MergePersonaResult from './results/MergePersonaResult';
import OverwriteIdentifierResult from './results/OverwriteIdentifierResult';

interface Service extends CommonService {
  readonly createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  readonly createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  readonly deletePersona: (opts: DeletePersonaOptions) => Promise<void>;
  readonly getIdentifier: (opts: GetIdentifierOptions) => Promise<GetIdentifierResult>;
  readonly getPersona: (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
  readonly mergePersona: (opts: MergePersonaOptions) => Promise<MergePersonaResult>;
  readonly getIdentifiers: (opts: GetIdentifiersOptions) => Promise<GetIdentifiersResult>;
  readonly getPersonas: (opts: GetPersonasOptions) => Promise<GetPersonasResult>;
  readonly overwriteIdentifier: (opt: OverwriteIdentifierOptions) =>
    Promise<OverwriteIdentifierResult>;
}

export default Service;
