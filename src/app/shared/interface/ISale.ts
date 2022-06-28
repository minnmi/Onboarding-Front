import {SaleStatusEnum} from "../enums/SaleStatusEnum";
import {IProduct} from "./IProduct";


export interface ISale {

  saleDate: Date;
  userSale: string;
  totalValue: number;
  valueDiscount: number;
  saleStatus: SaleStatusEnum;
  comment: string;
  idPerson: number;
  saleProductList: IProduct[];

}
