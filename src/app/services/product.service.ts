import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IResultHttp} from "../shared/interface/IResultHttp";
import {ProductStatusEnum} from "../shared/enums/ProductStatusEnum";
import {IProduct, IProductRequest} from "../shared/interface/IProduct";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  async listar(name?: string, status?: ProductStatusEnum, idCategory?: number): Promise<IResultHttp<IProduct[]>> {
    const url = `${environment.urlBase}/products`;
    return await this.http.get<IResultHttp<IProduct[]>>(url, {
      params: new HttpParams()
        .set('name', name || '')
        .set('status', status || '')
        .set('idCategory', idCategory || '')
    }).toPromise();
  }


  async salvar(product: IProductRequest): Promise<void> {
    const url = `${environment.urlBase}/products`
    await this.http.post(url, product).toPromise();
  }

  async delete(id: number): Promise<void> {
    const url = `${environment.urlBase}/products/${id}`;
    await this.http.delete(url).toPromise();
  }

  async editar(id: number, product: IProductRequest): Promise<void> {
    const url = `${environment.urlBase}/products/${id}`
    await this.http.put(url, product).toPromise();
  }

  async buscar(id: number): Promise<IResultHttp<IProduct>> {
    const url = `${environment.urlBase}/products/${id}`;
    return await this.http.get<IResultHttp<IProduct>>(url).toPromise();
  }
}
