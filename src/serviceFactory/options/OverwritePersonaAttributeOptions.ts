
export default interface OverwritePersonaAttributeOptions {
  readonly personaId: string;
  readonly organisation: string; // organisation id
  readonly key: string;
  readonly value: string | number | boolean;
}
