import ProfileOptions from './ProfileOptions';

interface Options extends ProfileOptions {
  content: NodeJS.ReadableStream;
}

export default Options;
