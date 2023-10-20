export class CreateUserDto {
  readonly names: string;
  readonly surnames: string;
  readonly email: string;
  readonly password: string;
  readonly rol: string;
  readonly company_id: string;
}
