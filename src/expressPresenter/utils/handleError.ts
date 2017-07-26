import { Response } from 'express';
import commonErrorHandler from 'jscommons/dist/expressPresenter/utils/handleError';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import sendMessage from 'jscommons/dist/expressPresenter/utils/sendMessage';
import { isNull, isUndefined } from 'lodash';
import { Warnings } from 'rulr';
import Conflict from '../../errors/Conflict';
import IfMatch from '../../errors/IfMatch';
import IfNoneMatch from '../../errors/IfNoneMatch';
import InvalidMethod from '../../errors/InvalidMethod';
import MaxEtags from '../../errors/MaxEtags';
import NonJsonObject from '../../errors/NonJsonObject';
import Translator from '../../translatorFactory/Translator';
import sendWarnings from './sendWarnings';

interface Options extends CommonOptions {
  translator: Translator;
}

export default ({ translator, errorId, res, err }: Options): Response => {
  if (isNull(err) || isUndefined(null)) {
    const code = 500;
    const message = translator.serverError();
    return sendMessage({ res, code, errorId, message });
  }

  switch (err.constructor) {
    case MaxEtags: {
      const code = 400;
      const message = translator.maxEtagsError(err as MaxEtags);
      return sendMessage({ res, code, errorId, message });
    } case Conflict: {
      const code = 409;
      const message = translator.conflictError(err as Conflict);
      return sendMessage({ res, code, errorId, message });
    } case IfMatch: {
      const code = 412;
      const message = translator.ifMatchError(err as IfMatch);
      return sendMessage({ res, code, errorId, message });
    } case IfNoneMatch: {
      const code = 412;
      const message = translator.ifNoneMatchError(err as IfNoneMatch);
      return sendMessage({ res, code, errorId, message });
    } case NonJsonObject: {
      const code = 400;
      const message = translator.nonJsonObjectError(err as NonJsonObject);
      return sendMessage({ res, code, errorId, message });
    } case Warnings: {
      const code = 400;
      const warnings = (err as Warnings).warnings;
      return sendWarnings({ res, code, errorId, warnings, translator });
    } case InvalidMethod: {
      const code = 400;
      const message = translator.invalidMethodError(err as InvalidMethod);
      return sendMessage({ res, code, errorId, message });
    } default: {
      return commonErrorHandler({ translator, errorId, res, err });
    }
  }
};
