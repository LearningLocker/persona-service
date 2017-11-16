export default interface GetPersonaIdentifiersOptions {
  readonly persona?: string;
  readonly organisation: string;
  readonly filter?: object;
  readonly sort?: object;
  readonly limit?: number;
  readonly skip?: number;
}
