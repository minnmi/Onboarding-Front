import {GenderEnum} from "../enums/GenderEnum";
import {TypeEnum} from "../enums/TypeEnum";
import {PersonStatusEnum} from "../enums/PersonStatusEnum";
import {IAddress} from "./IAddress";
import {IPhone} from "./IPhone";
import {IEmail} from "./IEmail";

export interface IPerson {
  id?: number;
  name: string;
  document: string;
  birth: Date | null;
  gender: GenderEnum | null;
  inscricaoEstadual: string | null;
  status: PersonStatusEnum;
  type: TypeEnum;
  addresses: IAddress[];
  phones: IPhone[];
  emails: IEmail[];


}


