import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IPersonReport} from "../shared/interface/IPersonReport";

@Injectable({
  providedIn: 'root'
})
export class ReportPersonService {

  constructor(private http: HttpClient) {
  }

  async getReport(personReport: IPersonReport) {
    const url = `${environment.urlBase}/reports/persons`;
    return await this.http.get(url, {
      responseType: 'blob' as 'json',
      params: new HttpParams()
        .set('idPerson', personReport.idPerson || '')
        .set('personType', personReport.personType || '')
    }).toPromise();

  }

}
