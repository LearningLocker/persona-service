import AgentProfileOptions from './AgentProfileOptions';

interface Options extends AgentProfileOptions {
  content: NodeJS.ReadableStream;
}

export default Options;
