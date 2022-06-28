import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ISaleReportRequest} from "../shared/interface/ISaleReport";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class ReportSaleService {

  constructor(private http: HttpClient) {
  }

  async getReport(saleReport: ISaleReportRequest) {
    const url = `${environment.urlBase}/reports/sales`;
    return await this.http.get(url, {
      responseType: 'blob' as 'json',
      params: new HttpParams()
        .set('startDate', this.convertDate(saleReport.startDate) || '')
        .set('endDate', this.convertDate(saleReport.endDate) || '')
        .set('startValue', saleReport.startValue || '')
        .set('endValue', saleReport.endValue || '')
        .set('idPerson', saleReport.idPerson || '')
        .set('idProduct', saleReport.idProduct || '')
    }).toPromise();

  }

  convertDate(date: Date | null) {
    if (!date) {
      return null;
    }
    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  }
}
