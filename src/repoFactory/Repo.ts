import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateIdentifierOptions from './options/CreateIdentifierOptions';
import CreatePersonaOptions from './options/CreatePersonaOptions';
import DeletePersonaOptions from './options/DeletePersonaOptions';
import GetIdentifierByIfiOptions from './options/GetIdentifierByIfiOptions';
import GetIdentifierOptions from './options/GetIdentifierOptions';
import GetIfisByPersonaOptions from './options/GetIfisByPersonaOptions';
import GetPersonaOptions from './options/GetPersonaOptions';
import MergePersonaOptions from './options/MergePersonaOptions';
import OverwriteIdentifierOptions from './options/OverwriteIdentifierOptions';
import SetIdentifierPersonaOptions from './options/SetIdentifierPersonaOptions';
import CreateIdentifierResult from './results/CreateIdentifierResult';
import CreatePersonaResult from './results/CreatePersonaResult';
import GetIdentifierByIfiResult from './results/GetIdentifierByIfiResult';
import GetIdentifierResult from './results/GetIdentifierResult';
import GetIfisByPersonaResult from './results/GetIfisByPersonaResult';
import GetPersonaResult from './results/GetPersonaResult';
import MergePersonaResult from './results/MergePersonaResult';
import OverwriteIdentifierResult from './results/OverwriteIdentifierResult';

export default interface Repo extends CommonRepo {
  readonly createIdentifier: (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
  readonly createPersona: (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
  readonly deletePersona: (opts: DeletePersonaOptions) => Promise<void>;
  readonly getIdentifierByIfi:
    (opts: GetIdentifierByIfiOptions) => Promise<GetIdentifierByIfiResult>;
  readonly getIdentifier: (opt: GetIdentifierOptions) => Promise<GetIdentifierResult>;
  readonly getIfisByPersona: (opts: GetIfisByPersonaOptions) => Promise<GetIfisByPersonaResult>;
  readonly getPersona: (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
  readonly overwriteIdentifier:
    (opts: OverwriteIdentifierOptions) => Promise<OverwriteIdentifierResult>;
  readonly setIdentifierPersona: (opts: SetIdentifierPersonaOptions) => Promise<void>;
  readonly mergePersona: (opts: MergePersonaOptions) => Promise<MergePersonaResult>;
}
