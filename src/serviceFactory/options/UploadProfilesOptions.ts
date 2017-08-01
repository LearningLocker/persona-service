import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';

interface UploadProfilesOptions {
  readonly client: ClientModel;
  readonly primaryAgent: Agent;
  readonly secondaryAgents: Agent[];
  readonly profiles: {
    [key: string]: any;
  };
}

export default UploadProfilesOptions;
