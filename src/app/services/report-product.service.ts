import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IProductReportRequest} from "../shared/interface/IProductReportRequest";

@Injectable({
  providedIn: 'root'
})
export class ReportProductService {

  constructor(private http: HttpClient) {
  }


  async getReport(productReport: IProductReportRequest) {
    const url = `${environment.urlBase}/reports/products`;
    return await this.http.get(url, {
      responseType: 'blob' as 'json',
      params: new HttpParams()
        .set('idCategory', productReport.idCategory || '')
        .set('idProduct', productReport.idProduct || '')
        .set('status', productReport.status || '')
    }).toPromise();

  }

}
