import commonTranslator from 'jscommons/dist/translatorFactory/en';
import Translator from './Translator';

const translator: Translator = {
  conflictError: () => (
    'Get the profile to retrieve the Etag, then set the If-Match header to the Etag'
  ),
  ifMatchError: () => (
    'IfMatch does not match Etag because a modification has been made since it was retrieved'
  ),
  ifNoneMatchError: () => (
    'IfNoneMatch was used to detect that the resource was already present'
  ),
  nonJsonObjectError: () => (
    'Expected a JSON object to be provided and stored (if it exists)'
  ),
  ...commonTranslator,
};

export default translator;
