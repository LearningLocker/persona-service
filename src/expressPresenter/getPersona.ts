import { Request, Response } from 'express';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getClient from './utils/getClient';
import { OK_200_HTTP_CODE } from './utils/httpCodes';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));

    const personaId = req.params.id as string;

    const {persona} = await config.service.getPersona({
      client,
      personaId,
    });

    res.status(OK_200_HTTP_CODE).json(persona);
  });
};
