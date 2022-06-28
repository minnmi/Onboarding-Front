import {AddressDefaultEnum} from "../enums/AddressDefaultEnum";

export interface IAddress {

  cep: string;
  place: string;
  neighborhood: string;
  city: string;
  uf: string;
  addressDefault: AddressDefaultEnum;
}
