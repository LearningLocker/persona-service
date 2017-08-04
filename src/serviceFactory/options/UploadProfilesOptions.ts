import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';

export interface Profiles {
  readonly [key: string]: any;
}

interface UploadProfilesOptions {
  readonly client: ClientModel;
  readonly primaryAgent: Agent;
  readonly secondaryAgents: Agent[];
  readonly profiles: Profiles;
}

export default UploadProfilesOptions;
