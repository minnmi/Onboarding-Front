import {ProductTypeEnum} from "../enums/ProductTypeEnum";
import {ProductStatusEnum} from "../enums/ProductStatusEnum";

export interface IProduct {

  id: number;
  idProduct?: number;
  name: string;
  idCategory: number;
  category: string;
  value: number;
  discountValue: number;
  quantity: number;
  type: ProductTypeEnum;
  status: ProductStatusEnum;

}

export interface IProductRequest {
  id?: number;
  name: string;
  idCategory?: number;
  value: number;
  discountValue: number;
  quantity: number;
  type: ProductTypeEnum;
  status: ProductStatusEnum;
}
