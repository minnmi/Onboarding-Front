import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {StatusEnum} from "../shared/enums/StatusEnum";
import {IResultHttp} from "../shared/interface/IResultHttp";
import {ICategory} from "../shared/interface/ICategory";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {
  }

  async listar(name?: string, status?: StatusEnum): Promise<IResultHttp<ICategory[]>> {
    const url = `${environment.urlBase}/categories`;
    return await this.http.get<IResultHttp<ICategory[]>>(url, {
      params: new HttpParams()
        .set('name', name || '')
        .set('status', status || '')
    }).toPromise();
  }

  async salvar(category: ICategory): Promise<void> {
    const url = `${environment.urlBase}/categories`;
    await this.http.post<Promise<ICategory>>
    (url, category).toPromise();
  }

  async delete(id: number): Promise<void> {
    const url = `${environment.urlBase}/categories/${id}`;
    await this.http.delete(url).toPromise();
  }

  async editar(id: number, category: ICategory): Promise<void> {
    const url = `${environment.urlBase}/categories/${id}`;
    await this.http.put(url, category).toPromise();
  }

  async buscar(id: number): Promise<IResultHttp<ICategory>> {
    const url = `${environment.urlBase}/categories/${id}`;
    return await this.http.get<IResultHttp<ICategory>>(url).toPromise();
  }
}
