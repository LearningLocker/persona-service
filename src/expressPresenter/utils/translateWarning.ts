import commonTranslateWarning from 'jscommons/dist/expressPresenter/utils/translateWarning';
import { Warning } from 'rulr';
import IfiCountWarning from 'xapi-validation/dist/warnings/IfiCountWarning';
import NoIfiWarning from 'xapi-validation/dist/warnings/NoIfiWarning';
import Translator from '../../translatorFactory/Translator';

export default (translator: Translator, warning: Warning) => {
  switch (warning.constructor) {
    case IfiCountWarning:
      return translator.ifiCountWarning(warning as IfiCountWarning);
    case NoIfiWarning:
      return translator.noIfiWarning(warning as NoIfiWarning);
    default:
      return commonTranslateWarning(translator, warning);
  }
};
