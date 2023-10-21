import {UserLocation} from "../../userLocation/entities/userLocation.entity";

export class CreateUserDto {
  readonly names: string;
  readonly surnames: string;
  readonly email: string;
  readonly password: string;
  readonly rol: string;
  readonly company_id: string;
  readonly typeIdentificationId: number;
  readonly nameIdentification: string;
  readonly locationId: UserLocation;
  readonly identification: string;
}
