import { Request, Response } from 'express';
import BaseError from 'jscommons/dist/errors/BaseError';
import CommonHandler from 'jscommons/dist/expressPresenter/utils/Handler';
import { v4 as uuid } from 'uuid';
import Config from '../Config';
import handleError from '../utils/handleError';

export default (config: Config, handler: CommonHandler) => {
  const logger = config.logger;
  const translator = config.translator;

  return (req: Request, res: Response): void => {
    handler(req, res).catch((err: any | Error | BaseError) => {
      const errorId = uuid();
      logger.error(errorId, err);
      return handleError({ translator, errorId, res, err });
    });
  };
};
