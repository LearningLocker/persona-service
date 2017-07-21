import CommonTranslator from 'jscommons/dist/translatorFactory/Translator';
import Conflict from '../errors/Conflict';
import IfMatch from '../errors/IfMatch';
import IfNoneMatch from '../errors/IfNoneMatch';
import NonJsonObject from '../errors/NonJsonObject';

interface Translator extends CommonTranslator {
  readonly conflictError: (err: Conflict) => string;
  readonly ifMatchError: (err: IfMatch) => string;
  readonly ifNoneMatchError: (err: IfNoneMatch) => string;
  readonly nonJsonObjectError: (err: NonJsonObject) => string;
}

export default Translator;
