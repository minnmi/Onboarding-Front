import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IResultHttp} from "../shared/interface/IResultHttp";
import {IPhone} from "../shared/interface/IPhone";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})

export class PhoneService {
  constructor(private http: HttpClient) {
  }


  async buscar(id: number): Promise<IResultHttp<IPhone[]>> {
    const url = `${environment.urlBase}/persons/${id}/phones`;
    return await this.http.get<IResultHttp<IPhone[]>>(url).toPromise();
  }

}
