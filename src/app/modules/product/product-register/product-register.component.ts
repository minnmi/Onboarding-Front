import {Component, OnInit} from '@angular/core';
import {IProduct, IProductRequest} from "../../../shared/interface/IProduct";
import {ICategory} from "../../../shared/interface/ICategory";
import {ProductStatusEnum} from "../../../shared/enums/ProductStatusEnum";
import {MessageService, SelectItem} from "primeng/api";
import {ProductTypeEnum} from "../../../shared/enums/ProductTypeEnum";
import {ProductService} from "../../../services/product.service";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.scss']
})
export class ProductRegisterComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  product: IProductRequest = {} as IProductRequest;
  // product: IProduct = {} as IProduct;
  category: ICategory = {} as ICategory;
  idProduct?: number;
  status: ProductStatusEnum = ProductStatusEnum.EMPTY;
  statusOptions: SelectItem[] = [
    {label: "ATIVO", value: ProductStatusEnum.A},
    {label: "INATIVO", value: ProductStatusEnum.I}
  ];
  type?: ProductTypeEnum;
  typeOptions: SelectItem[] = [
    {label: 'Unidade', value: ProductTypeEnum.UNIDADE},
    {label: 'Caixa', value: ProductTypeEnum.CAIXA},
    {label: 'Peso', value: ProductTypeEnum.PESO}
  ];
  name: string = '';
  quantity = 0;
  discountValue = 0;
  value = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private rotas: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
  }

  async loadProduct(idProduct: number): Promise<void> {
    const {success, data} = await this.productService.buscar(idProduct);
    if (success) {
      this.name = data.name;
      this.quantity = data.quantity;
      this.discountValue = data.discountValue;
      this.value = data.value;
      this.type = data.type;
      this.status = data.status;
      this.category = this.categories.find(cat => cat.idCategory === data.idCategory) || {} as ICategory;

    }
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.idProduct = +queryParams['idProduct'];
    });
    const {success, data} = await this.categoryService.listar();
    if (success) {
      this.categories = data;
    }
    if (this.idProduct) {
      await this.loadProduct(+this.idProduct);
    }
  }

  setProductFields() {
    this.product = {
      id: this.idProduct,
      name: this.name,
      idCategory: this.category.idCategory,
      value: this.value,
      discountValue: this.discountValue,
      quantity: this.quantity,
      type: this.type!,
      status: this.status
    }

  }

  async clickSave(): Promise<void> {
    this.setProductFields();
    try {
      if (this.idProduct) {
        await this.productService.editar(this.idProduct, this.product);
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Ok',
            detail: 'Produto salvo com sucesso!'
          });
        }, 0)
      } else {
        await this.productService.salvar(this.product);
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Ok',
            detail: 'Produto criado com sucesso!'
          });
        }, 0)
      }
      this.rotas.navigate(['/product']);
    } catch (e) {

    }
  }


}
