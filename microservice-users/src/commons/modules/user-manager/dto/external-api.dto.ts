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
}

export class Identity {
  connection: string;
  user_id: string;
  provider: string;
  isSocial: boolean;
}
