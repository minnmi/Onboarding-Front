import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IResultHttp} from "../shared/interface/IResultHttp";
import {IAddress} from "../shared/interface/IAddress";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})

export class AddressService {
  constructor(private http: HttpClient) {
  }

  async buscar(id: number): Promise<IResultHttp<IAddress[]>> {
    const url = `${environment.urlBase}/persons/${id}/addresses`;
    return await this.http.get<IResultHttp<IAddress[]>>(url).toPromise();
  }


}
