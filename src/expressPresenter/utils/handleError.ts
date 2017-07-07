import { Response } from 'express';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import commonErrorHandler from 'jscommons/dist/expressPresenter/utils/handleError';
import sendMessage from 'jscommons/dist/expressPresenter/utils/sendMessage';
import { isNull, isUndefined } from 'lodash';
import Translator from '../../translatorFactory/Translator';

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
    default: {
      return commonErrorHandler({ translator, errorId, res, err });
    }
  }
};
