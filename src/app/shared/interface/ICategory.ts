import {StatusEnum} from "../enums/StatusEnum";

export interface ICategory {
  idCategory?: number;
  name: string;
  status: StatusEnum;
}

