

interface PromiseRetryOptions {
  readonly retries?: number;
  readonly factor?: number;
  readonly minTimeout?: number;
  readonly maxTimeout?: number;
  readonly randomize?: number;
}

declare module 'promise-retry' {
  const promiseRetry: <T>(
    fn: ( retry: (err: any) => Promise<T>, retires: number ) => Promise<T>, opts?: PromiseRetryOptions
  ) => Promise<T>;
  
  export = promiseRetry;
}
