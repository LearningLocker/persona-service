import { Response } from 'express';
import sendObject from 'jscommons/dist/expressPresenter/utils/sendObject';
import { Warning } from 'rulr';
import Translator from '../../translatorFactory/Translator';
import translateWarning from './translateWarning';

export interface Opts {
  res: Response;
  code: number;
  errorId: string;
  warnings: Warning[];
  translator: Translator;
}

export default ({ res, code, errorId, warnings, translator }: Opts): Response => {
  const strWarnings = warnings.map((warning) => {
    return translateWarning(translator, warning);
  });
  const obj = { warnings: strWarnings };
  return sendObject({ res, code, errorId, obj });
};
