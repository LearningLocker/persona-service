export default interface GetPersonaAttributesOptions {
  readonly personaId?: string;
  readonly organisation: string;
  readonly filter?: object;
  readonly sort?: object;
  readonly limit?: number;
  readonly skip?: number;
}
