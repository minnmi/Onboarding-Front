import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IEmail} from "../shared/interface/IEmail";
import {environment} from "../../environments/environment";
import {IResultHttp} from "../shared/interface/IResultHttp";


@Injectable({
  providedIn: 'root'
})

export class EmailService {
  constructor(private http: HttpClient) {
  }


  async buscar(id: number): Promise<IResultHttp<IEmail[]>> {
    const url = `${environment.urlBase}/persons/${id}/emails`;
    return await this.http.get<IResultHttp<IEmail[]>>(url).toPromise();
  }

}
