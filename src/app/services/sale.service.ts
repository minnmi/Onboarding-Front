import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ISale} from "../shared/interface/ISale";
import {environment} from "../../environments/environment";
import {DateUtil} from "../shared/utils/date-util";

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) {
  }

  async salvar(sale: ISale): Promise<void> {
    const url = `${environment.urlBase}/sales`
    const body = {
      userSale: sale.userSale,
      saleDate: DateUtil.formatUS(sale.saleDate),
      totalValue: sale.totalValue,
      valueDiscount: sale.valueDiscount,
      comment: sale.comment,
      idPerson: sale.idPerson,
      saleProductList: sale.saleProductList

    }

    await this.http.post(url, body).toPromise();
  }


}


