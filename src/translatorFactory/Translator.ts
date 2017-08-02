import CommonTranslator from 'jscommons/dist/translatorFactory/Translator';
import IfiCountWarning from 'xapi-validation/dist/warnings/IfiCountWarning';
import NoIfiWarning from 'xapi-validation/dist/warnings/NoIfiWarning';
import Conflict from '../errors/Conflict';
import DuplicateMergeId from '../errors/DuplicateMergeId';
import IfMatch from '../errors/IfMatch';
import IfNoneMatch from '../errors/IfNoneMatch';
import InvalidMethod from '../errors/InvalidMethod';
import MaxEtags from '../errors/MaxEtags';
import MissingMergeFromPersona from '../errors/MissingMergeFromPersona';
import MissingMergeToPersona from '../errors/MissingMergeToPersona';
import NoModelWithId from '../errors/NoModelWithId';
import NonJsonObject from '../errors/NonJsonObject';
import UnassignedPersonaOnIdentifier from '../errors/UnassignedPersonaOnIdentifier';

interface Translator extends CommonTranslator {
  readonly conflictError: (err: Conflict) => string;
  readonly duplicateMergeIdError: (err: DuplicateMergeId) => string;
  readonly ifiCountWarning: (err: IfiCountWarning) => string;
  readonly ifMatchError: (err: IfMatch) => string;
  readonly ifNoneMatchError: (err: IfNoneMatch) => string;
  readonly invalidMethodError: (err: InvalidMethod) => string;
  readonly maxEtagsError: (err: MaxEtags) => string;
  readonly missingMergeFromPersona: (err: MissingMergeFromPersona) => string;
  readonly missingMergeToPersona: (err: MissingMergeToPersona) => string;
  readonly nonJsonObjectError: (err: NonJsonObject) => string;
  readonly noIfiWarning: (err: NoIfiWarning) => string;
  readonly noModelWithIdError: (err: NoModelWithId) => string;
  readonly routeNotFound: () => string;
  readonly unassignedPersonaOnIdentifier: (err: UnassignedPersonaOnIdentifier) => string;
  readonly invalidGetPersonaFromIdentifierOptions: () => string;
}

export default Translator;
