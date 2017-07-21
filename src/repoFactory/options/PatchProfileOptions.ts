import ClientModel from '../../models/ClientModel';

interface Options {
  readonly client: ClientModel;
  readonly content: any;
  readonly contentType: string;
  readonly etag: string;
  readonly ifMatch?: string;
  readonly ifNoneMatch?: string;
  readonly profileId: string;
  readonly personaIdentifier: string;
}

export default Options;
