interface Model {
  readonly etag: string;
  readonly id: string;
  readonly organisation: string;
  readonly personaIdentifier: string;
  readonly profileId: string;
  readonly content?: any;
  readonly contentType: string;
  readonly lrs: string;
  readonly updatedAt: Date;
}

export default Model;
