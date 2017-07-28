import CommonTranslator from 'jscommons/dist/translatorFactory/Translator';
import IfiCountWarning from 'xapi-validation/dist/warnings/IfiCountWarning';
import NoIfiWarning from 'xapi-validation/dist/warnings/NoIfiWarning';
import Conflict from '../errors/Conflict';
import DuplicateMergeId from '../errors/DuplicateMergeId';
import IfMatch from '../errors/IfMatch';
import IfNoneMatch from '../errors/IfNoneMatch';
import InvalidMethod from '../errors/InvalidMethod';
import MaxEtags from '../errors/MaxEtags';
import NonJsonObject from '../errors/NonJsonObject';

interface Translator extends CommonTranslator {
  readonly conflictError: (err: Conflict) => string;
  readonly ifiCountWarning: (err: IfiCountWarning) => string;
  readonly ifMatchError: (err: IfMatch) => string;
  readonly ifNoneMatchError: (err: IfNoneMatch) => string;
  readonly invalidMethodError: (err: InvalidMethod) => string;
  readonly maxEtagsError: (err: MaxEtags) => string;
  readonly duplicateMergeIdError: (err: DuplicateMergeId) => string;
  readonly nonJsonObjectError: (err: NonJsonObject) => string;
  readonly noIfiWarning: (err: NoIfiWarning) => string;
}

export default Translator;
