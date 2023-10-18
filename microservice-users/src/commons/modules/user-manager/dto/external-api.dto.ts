export class ExternalApiResponseDto {
  blocked: boolean;
  created_at: string;
  email: string;
  email_verified: boolean;
  identities: Identity[];
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  user_id: string;
  user_metadata: object;
  app_metadata: object;

  constructor(
    blocked: boolean,
    created_at: string,
    email: string,
    email_verified: boolean,
    identities: Identity[],
    name: string,
    nickname: string,
    picture: string,
    updated_at: string,
    user_id: string,
    user_metadata: object,
    app_metadata: object,
  ) {
    this.blocked = blocked;
    this.created_at = created_at;
    this.email = email;
    this.email_verified = email_verified;
    this.identities = identities;
    this.name = name;
    this.nickname = nickname;
    this.picture = picture;
    this.updated_at = updated_at;
    this.user_id = user_id;
    this.user_metadata = user_metadata;
    this.app_metadata = app_metadata;
  }
}

export class Identity {
  connection: string;
  user_id: string;
  provider: string;
  isSocial: boolean;

  constructor(connection: string, user_id: string, provider: string, isSocial: boolean) {
    this.connection = connection;
    this.user_id = user_id;
    this.provider = provider;
    this.isSocial = isSocial;
  }
}
