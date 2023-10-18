export class AuthRole {
  readonly name: string;
  readonly auth0Id: string;

  constructor(name: string, auth0Id: string) {
    this.name = name;
    this.auth0Id = auth0Id;
  }
}

export class Auth0RoleEnum {
  static readonly CANDIDATO = new AuthRole('Candidato', 'rol_eZgSHO1u8hh3P3js');
  static readonly FUNCIONARIO_ABC = new AuthRole('Funcionario ABC', 'rol_y1uygpwPWTbCJr37');
  static readonly ADMIN = new AuthRole('Admin', 'rol_ZcAb3hSj6gzdeXth');
  static readonly REPRESENTANTE = new AuthRole('Representante empresa', 'rol_8Q5mGrFvAw7s8RVZ');
}
