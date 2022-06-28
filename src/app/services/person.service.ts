import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TypeEnum} from "../shared/enums/TypeEnum";
import {IResultHttp} from "../shared/interface/IResultHttp";
import {IPerson} from "../shared/interface/IPerson";
import {environment} from "../../environments/environment";
import {PersonStatusEnum} from "../shared/enums/PersonStatusEnum";


@Injectable({
  providedIn: 'root'
})

export class PersonService {
  constructor(private http: HttpClient) {
  }

  async listar(name: string, status: PersonStatusEnum, type: TypeEnum): Promise<IResultHttp<IPerson[]>> {
    const url = `${environment.urlBase}/persons`;
    return await this.http.get<IResultHttp<IPerson[]>>(url, {
      params: new HttpParams()
        .set('name', name)
        .set('status', status)
        .set('type', type)
    }).toPromise();
  }

  async salvar(person: IPerson): Promise<void> {
    const url = `${environment.urlBase}/persons`;
    await this.http.post<Promise<IPerson>>
    (url, person).toPromise();
  }

  async delete(id: number): Promise<void> {
    const url = `${environment.urlBase}/persons/${id}`;
    await this.http.delete(url).toPromise();
  }

  async editar(id: number, person: IPerson): Promise<void> {
    const url = `${environment.urlBase}/persons/${id}`;
    await this.http.put(url, person).toPromise();
  }

  async buscar(id: number): Promise<IResultHttp<IPerson>> {
    const url = `${environment.urlBase}/persons/${id}`;
    return await this.http.get<IResultHttp<IPerson>>(url).toPromise();
  }
}
