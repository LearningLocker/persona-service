declare module 'stream-to-string' {
  const x: (stream: NodeJS.ReadableStream) => Promise<string>;
  export = x;
}
