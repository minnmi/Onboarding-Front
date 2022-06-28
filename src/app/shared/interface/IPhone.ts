import {PhoneTypeEnum} from "../enums/PhoneTypeEnum";
import {PhoneDefaultEnum} from "../enums/PhoneDefaultEnum";

export interface IPhone {
  phone: string;
  phoneType: PhoneTypeEnum;
  phoneDefault: PhoneDefaultEnum;
}
