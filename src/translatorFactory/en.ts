import commonTranslator from 'jscommons/dist/translatorFactory/en';
import stringPath from 'jscommons/dist/translatorFactory/utils/stringPath';
import Translator from './Translator';

const translator: Translator = {
  conflictError: () => (
    'Get the profile to retrieve the Etag, then set the If-Match header to the Etag'
  ),
  duplicateMergeIdError: (err) => (`Can not merge with dupliate id (${err.id})`),
  ifMatchError: () => (
    'IfMatch does not match Etag because a modification has been made since it was retrieved'
  ),
  ifNoneMatchError: () => (
    'IfNoneMatch was used to detect that the resource was already present'
  ),
  ifiCountWarning: (warning) => {
    const path = stringPath(warning.path);
    const usedIfis = `'${warning.usedIfis.join("', '")}'`;
    const count = warning.usedIfis.length;
    return `Only expected 1 IFI in ${path} not ${count} (${usedIfis})`;
  },
  invalidMethodError: (err) => (
    `Method (${err.method}) is invalid for alternate request syntax`
  ),
  maxEtagsError: () => (
    'IfMatch and IfNoneMatch cannot be used at the same time'
  ),
  noIfiWarning: (warning) => {
    const path = stringPath(warning.path);
    return `Expected 1 IFI in ${path} not 0`;
  },
  nonJsonObjectError: () => (
    'Expected a JSON object to be provided and stored (if it exists)'
  ),
  ...commonTranslator,
};

export default translator;
