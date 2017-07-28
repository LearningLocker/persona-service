import Unauthorised from 'jscommons/dist/errors/Unauthorised';
import Actor from '../models/Actor';
import ClientModel from '../models/ClientModel';
import GetClientOptions from '../repoFactory/options/GetClientOptions';
import GetClientResult from '../repoFactory/results/GetClientResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetClientOptions): Promise<GetClientResult> => {
    try {
      const json = await fetch(config.llClientInfoEndpoint, {
        headers: {
          Authorization: opts.authToken,
        },
      }).then((res) => {
        return res.json();
      });

      const client: ClientModel = {
        _id: json._id as string,
        authority: json.authority as Actor,
        isTrusted: json.isTrusted as boolean,
        lrs_id: json.lrs_id as string,
        organisation: json.organisation as string,
        scopes: json.scopes as string[],
        title: json.title as string,
      };
      return { client };
    } catch (err) {
      throw new Unauthorised();
    }
  };
};
