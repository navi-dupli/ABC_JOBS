export class CreateUserDto {
  readonly names: string;
  readonly surnames: string;
  readonly email: string;
  readonly password: string;
  readonly roles: string[];
}
