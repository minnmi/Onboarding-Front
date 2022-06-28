import {Component, OnInit} from '@angular/core';
import {IProductReportRequest} from "../../../shared/interface/IProductReportRequest";
import {IProduct} from "../../../shared/interface/IProduct";
import {ICategory} from "../../../shared/interface/ICategory";
import {StatusEnum} from "../../../shared/enums/StatusEnum";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {ReportProductService} from "../../../services/report-product.service";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {ProductStatusEnum} from "../../../shared/enums/ProductStatusEnum";

@Component({
  selector: 'app-report-product',
  templateUrl: './report-product.component.html',
  styleUrls: ['./report-product.component.scss']
})
export class ReportProductComponent implements OnInit {

  productReport = {} as IProductReportRequest;
  products: IProduct[] = [];
  productFiltereds: IProduct[] = [];
  productSelected: IProduct | null = {} as IProduct;
  categories: ICategory[] = [];
  categoryFiltereds: ICategory[] = [];
  categorySelected: ICategory | null = {} as ICategory;
  situacoes: SelectItem[] = [
    {label: "ATIVO", value: StatusEnum.ATIVO},
    {label: "INATIVO", value: StatusEnum.INATIVO}
  ];

  constructor(
    private reportProductService: ReportProductService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private rotas: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  async ngOnInit() {
    await this.getProducts();
    await this.getCategories();
    this.productReport.status = StatusEnum.EMPTY;
  }

  async getProducts() {
    const {success, data} = await this.productService.listar('', ProductStatusEnum.A, undefined);
    if (success) {
      this.products = data.filter(product => product.quantity > 0);
    }
  }

  async getCategories() {
    const {success, data} = await this.categoryService.listar('', StatusEnum.ATIVO);
    if (success) {
      this.categories = data;
    }
  }

  productsSearch(event: any): void {
    const nameProduct = event.query;
    this.productFiltereds = [];

    this.productFiltereds = this.products.filter(product =>
      product.name.toLowerCase().includes(nameProduct.toLowerCase()) && product.quantity > 0
    );
  }

  categoriesSearch(event: any): void {
    const nameCategory = event.query;
    this.categoryFiltereds = [];

    this.categoryFiltereds = this.categories.filter(category =>
      category.name.toLowerCase().includes(nameCategory.toLowerCase())
    );
  }

  onSelectProduct(product: IProduct) {
    this.productReport.idProduct = product.id as number;
  }

  onSelectCategory(category: ICategory) {
    this.productReport.idCategory = category.idCategory as number;
  }

  async reportBuilder() {
    const report = await this.reportProductService.getReport(this.productReport);
    const file = new Blob([report as any], {type: 'application/pdf'});
    const fileURL = URL.createObjectURL(file);
    // window.open(report as any);
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = fileURL;
    console.log(fileURL);
    document.body.appendChild(a);
    a.click();

  }

  limpar() {
    this.productReport.idProduct = null;
    this.productReport.idCategory = null;
    this.productReport.status = StatusEnum.EMPTY;
    this.categorySelected = null;
    this.productSelected = null;
  }

}
