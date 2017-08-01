import { Response } from 'express';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import commonErrorHandler from 'jscommons/dist/expressPresenter/utils/handleError';
import sendMessage from 'jscommons/dist/expressPresenter/utils/sendMessage';
import { isNull, isUndefined } from 'lodash';
import { Warnings } from 'rulr';
import Conflict from '../../errors/Conflict';
import DuplicateMergeId from '../../errors/DuplicateMergeId';
import IfMatch from '../../errors/IfMatch';
import IfNoneMatch from '../../errors/IfNoneMatch';
import InvalidMethod from '../../errors/InvalidMethod';
import MaxEtags from '../../errors/MaxEtags';
import MissingMergeFromPersona from '../../errors/MissingMergeFromPersona';
import MissingMergeToPersona from '../../errors/MissingMergeToPersona';
import NoModelWithId from '../../errors/NoModelWithId';
import NonJsonObject from '../../errors/NonJsonObject';
import UnassignedPersonaOnIdentifier from '../../errors/UnassignedPersonaOnIdentifier';
import Translator from '../../translatorFactory/Translator';
import { SERVER_ERROR_500_HTTP_CODE } from './httpCodes';
import sendWarnings from './sendWarnings';

interface Options extends CommonOptions {
  readonly translator: Translator;
}

export default ({ translator, errorId, res, err }: Options): Response => {
  if (isNull(err) || isUndefined(null)) {
    const code = 500;
    const message = translator.serverError();
    return sendMessage({ res, code, errorId, message });
  }

  switch (err.constructor) {
    case UnassignedPersonaOnIdentifier: {
      const message =
        translator.unassignedPersonaOnIdentifier(err as UnassignedPersonaOnIdentifier);
      const code = SERVER_ERROR_500_HTTP_CODE;
      return sendMessage({ res, code, errorId, message});
    } case MissingMergeFromPersona: {
      const code = 400;
      const message = translator.missingMergeFromPersona(err as MissingMergeFromPersona);
      return sendMessage({ res, code, errorId, message });
    } case MissingMergeToPersona: {
      const code = 400;
      const message = translator.missingMergeToPersona(err as MissingMergeToPersona);
      return sendMessage({ res, code, errorId, message });
    } case NoModelWithId: {
      const code = 404;
      const message = translator.noModelWithIdError(err as NoModelWithId);
      return sendMessage({ res, code, errorId, message });
    } case DuplicateMergeId: {
      const code = 400;
      const message = translator.duplicateMergeIdError(err as DuplicateMergeId);
      return sendMessage({ res, code, errorId, message });
    } case MaxEtags: {
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
