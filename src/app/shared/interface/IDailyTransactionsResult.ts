import {SaleStatusEnum} from "../enums/SaleStatusEnum";

export interface IDailyTransactionsResult {

  saleDate: Date;
  userSale: string;
  status: SaleStatusEnum;
  person: string;
  product: string;
  saleIdentity: number;
  quantity: number;
  value: number;

}

export interface IDailyTransactionsRequest {

  startDate: Date | null;
  endDate: Date | null;
  startValue: number | null;
  endValue: number | null;
  userSale: string | null;
  status: SaleStatusEnum | null;
  idPerson: number | null;
  idProduct: number | null;


}

