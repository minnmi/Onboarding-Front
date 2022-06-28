import {StatusEnum} from "../enums/StatusEnum";

export interface IProductReportRequest {
  idCategory: number | null;
  idProduct: number | null;
  status: StatusEnum;
}
