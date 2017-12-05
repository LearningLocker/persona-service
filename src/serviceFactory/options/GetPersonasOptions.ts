interface GetPersonasOptions {
  readonly organisation: string;
  readonly filter?: object;
  readonly sort?: object;
  readonly limit?: number;
  readonly skip?: number;
}

export default GetPersonasOptions;
