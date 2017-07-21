interface Model {
  etag: string;
  id: string;
  organisation: string;
  personaIdentifier: string;
  profileId: string;
  content?: any;
  contentType: string;
  lrs: string;
  updatedAt: Date;
}

export default Model;
