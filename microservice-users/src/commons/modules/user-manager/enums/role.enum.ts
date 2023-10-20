export class AuthRole {
  readonly name: string;
  readonly auth0Id: string;

  constructor(name: string, auth0Id: string) {
    this.name = name;
    this.auth0Id = auth0Id;
  }
}

export class Auth0RoleEnum {
  static readonly CANDIDATO = new AuthRole('CANDIDATO', 'rol_eZgSHO1u8hh3P3js');
  static readonly FUNCIONARIO_ABC = new AuthRole('FUNCIONARIO_ABC', 'rol_y1uygpwPWTbCJr37');
  static readonly ADMIN = new AuthRole('ADMIN', 'rol_ZcAb3hSj6gzdeXth');
  static readonly REPRESENTANTE_EMPRESA = new AuthRole('REPRESENTANTE_EMPRESA', 'rol_8Q5mGrFvAw7s8RVZ');

  // Método para buscar un rol por nombre
  static findByName(name: string): AuthRole | undefined {
    const roles = Object.values(this);
    return roles.find((role) => role.name === name);
  }
}
