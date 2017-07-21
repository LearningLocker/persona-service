import ClientModel from '../../models/ClientModel';

interface Options {
  readonly agent: any;
  readonly client: ClientModel;
  readonly content: NodeJS.ReadableStream;
  readonly contentType: string;
  readonly ifMatch?: string;
  readonly ifNoneMatch?: string;
  readonly profileId: string;
}

export default Options;
