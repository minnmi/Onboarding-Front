import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../../shared/interface/IProduct";
import {ProductStatusEnum} from "../../../shared/enums/ProductStatusEnum";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {ICategory} from "../../../shared/interface/ICategory";
import {ProductService} from "../../../services/product.service";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  category: ICategory | null = null;
  status: ProductStatusEnum = ProductStatusEnum.EMPTY;
  statusOptions: SelectItem[] = [
    {label: "ATIVO", value: ProductStatusEnum.A},
    {label: "INATIVO", value: ProductStatusEnum.I}
  ];
  name: string = '';
  loading!: boolean;
  buscar!: string;
  primeiroRegistroPagina = 0;
  ultimoRegistroPagina = 10
  totalRegistros = 0;
  rows = 10;


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private rotas: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  async ngOnInit() {
    await this.loadData();
  }

  next(): void {
    this.primeiroRegistroPagina = this.primeiroRegistroPagina + this.rows;
    this.ultimoRegistroPagina = this.ultimoRegistroPagina + this.rows;
  }

  prev(): void {
    this.primeiroRegistroPagina = this.primeiroRegistroPagina - this.rows;
    this.ultimoRegistroPagina = this.ultimoRegistroPagina - this.rows;
  }

  reset(): void {
    this.primeiroRegistroPagina = 0;
    this.ultimoRegistroPagina = this.rows
  }

  isLastPage(): boolean {
    return this.products ?
      this.primeiroRegistroPagina === (this.products.length - this.rows) : true;
  }

  async loadData() {

    const {success, data} = await this.categoryService.listar();
    if (success) {
      this.categories = data;
    }

    const idCategory = this.category ? this.category.idCategory : undefined;
    console.log(this.name);
    console.log(this.status);
    console.log(idCategory);
    const response = await this.productService.listar(this.name, this.status, idCategory);
    if (!response?.success) {
      return;
    }

    this.products = response.data;
    if (response.data.length === 0) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Atenção',
          detail: 'Não há registros para essa consulta'
        });
      }, 0)
    }
  }

  async clickAdicionar(): Promise<void> {
    await this.rotas.navigate(['/product/product-register'])
  }

  async clickEditar(idProduct: number): Promise<void> {
    await this.rotas.navigate(['/product/product-register'], {queryParams: {idProduct}})
  }

  async limpar() {
    this.name = '';
    this.status = ProductStatusEnum.EMPTY;
    this.category = null;
    await this.loadData();
  }

  async clickExcluir(event: any, idProduct: number): Promise<void> {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Deseja excluir este produto?',
      key: 'deleteConfirm',
      rejectLabel: 'Não',
      acceptLabel: 'Sim',
      accept: async () => {
        try {
          await this.productService.delete(idProduct);
          this.products = this.products
            .filter(product => (product.id !== idProduct));

          this.messageService.add({
            severity: 'success',
            summary: 'Ok',
            detail: 'Produto excluído com sucesso'
          });
        } catch (e) {
          console.log(e);

          this.messageService.add({
            severity: 'Erro',
            summary: 'Erro ao excluir',
            detail: 'Verifique se o produto possui registros relacionados'
          });
        }
      },
    });
  }

  getStatusLabel(status: ProductStatusEnum) {
    return status === ProductStatusEnum.A ? 'ATIVO' : 'INATIVO';
  }

}
