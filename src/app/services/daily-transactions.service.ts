import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IDailyTransactionsRequest, IDailyTransactionsResult} from "../shared/interface/IDailyTransactionsResult";
import {environment} from "../../environments/environment";
import {IResultHttp} from "../shared/interface/IResultHttp";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DailyTransactionsService {

  constructor(private http: HttpClient) {

  }

  async listar(dailyTransactions: IDailyTransactionsRequest): Promise<IResultHttp<IDailyTransactionsResult[]>> {
    const url = `${environment.urlBase}/transactions`;
    return await this.http.get<IResultHttp<IDailyTransactionsResult[]>>(url, {
      params: new HttpParams()
        .set('startDate', this.convertDate(dailyTransactions.startDate) || '')
        .set('endDate', this.convertDate(dailyTransactions.endDate) || '')
        .set('startValue', dailyTransactions.startValue || '')
        .set('endValue', dailyTransactions.endValue || '')
        .set('userSale', dailyTransactions.userSale || '')
        .set('status', dailyTransactions.status || '')
        .set('idPerson', dailyTransactions.idPerson || '')
        .set('idProduct', dailyTransactions.idProduct || '')
    }).toPromise();
  }

  convertDate(date: Date | null) {
    if (!date) {
      return null;
    }
    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  }

  async getReport(dailyTransactions: IDailyTransactionsRequest) {
    const url = `${environment.urlBase}/transactions/pdf`;
    return await this.http.get(url, {
      responseType: 'blob' as 'json',
      params: new HttpParams()
        .set('startDate', this.convertDate(dailyTransactions.startDate) || '')
        .set('endDate', this.convertDate(dailyTransactions.endDate) || '')
        .set('startValue', dailyTransactions.startValue || '')
        .set('endValue', dailyTransactions.endValue || '')
        .set('userSale', dailyTransactions.userSale || '')
        .set('status', dailyTransactions.status || '')
        .set('idPerson', dailyTransactions.idPerson || '')
        .set('idProduct', dailyTransactions.idProduct || '')
    }).toPromise();

  }


}
