import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';

interface UploadProfilesOptions {
  readonly client: ClientModel;
  readonly agents: Agent[];
  readonly profiles: {
    [key: string]: any;
  };
}

export default UploadProfilesOptions;
