import Unauthorised from 'jscommons/dist/errors/Unauthorised';
import fetch from 'node-fetch';
import Actor from '../../models/Actor';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';

export default async (config: Config, authHeader = ''): Promise<ClientModel> => {
  try {
    const json = await fetch(config.llClientInfoEndpoint, {
      headers: {
        Authorization: authHeader,
      },
    }).then((res) => {
      return res.json();
    });

    return {
      _id: json._id as string,
      authority: json.authority as Actor,
      isTrusted: json.isTrusted as boolean,
      lrs_id: json.lrs_id as string,
      organisation: json.organisation as string,
      scopes: json.scopes as string[],
      title: json.title as string,
    };
  } catch (err) {
    throw new Unauthorised();
  }
};
