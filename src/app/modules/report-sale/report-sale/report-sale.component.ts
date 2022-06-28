import {Component, OnInit} from '@angular/core';
import {IPerson} from "../../../shared/interface/IPerson";
import {IProduct} from "../../../shared/interface/IProduct";
import {PersonService} from "../../../services/person.service";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {PersonStatusEnum} from "../../../shared/enums/PersonStatusEnum";
import {TypeEnum} from "../../../shared/enums/TypeEnum";
import {ProductStatusEnum} from "../../../shared/enums/ProductStatusEnum";
import {ISaleReportRequest} from "../../../shared/interface/ISaleReport";
import * as moment from "moment";
import {ReportSaleService} from "../../../services/report-sale.service";

@Component({
  selector: 'app-report-sale',
  templateUrl: './report-sale.component.html',
  styleUrls: ['./report-sale.component.scss']
})
export class ReportSaleComponent implements OnInit {

  saleReport = {} as ISaleReportRequest;
  persons: IPerson[] = [];
  personFiltereds: IPerson[] = [];
  personSelected: IPerson | null = {} as IPerson;
  products: IProduct[] = [];
  productFiltereds: IProduct[] = [];
  productSelected: IProduct | null = {} as IProduct;

  constructor(
    private reportSaleService: ReportSaleService,
    private personService: PersonService,
    private productService: ProductService,
    private rotas: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }

  async ngOnInit() {
    await this.getPersons();
    await this.getProducts();
  }

  async getPersons() {
    const {success, data} = await this.personService.listar('', PersonStatusEnum.ATIVO, TypeEnum.F);
    if (success) {
      this.persons = data;
    }
  }

  async getProducts() {
    const {success, data} = await this.productService.listar('', ProductStatusEnum.A, undefined);
    if (success) {
      this.products = data.filter(product => product.quantity > 0);
    }
  }

  personsSearch(event: any): void {
    const namePerson = event.query;
    this.personFiltereds = [];

    this.personFiltereds = this.persons.filter(person =>
      person.name.toLowerCase().includes(namePerson.toLowerCase()));
  }

  productsSearch(event: any): void {
    const nameProduct = event.query;
    this.productFiltereds = [];

    this.productFiltereds = this.products.filter(product =>
      product.name.toLowerCase().includes(nameProduct.toLowerCase()) && product.quantity > 0
    );
  }

  onSelectPerson(person: IPerson) {
    this.saleReport.idPerson = person.id as number;
  }

  onSelectProduct(product: IProduct) {
    this.saleReport.idProduct = product.id as number;
  }

  formatUS(date?: Date): string | null {
    return moment(date).format('DD/MM/YYYY')
  }

  async reportBuilder() {
    const report = await this.reportSaleService.getReport(this.saleReport);
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

  async limpar() {
    this.saleReport.startDate = null;
    this.saleReport.endDate = null;
    this.saleReport.startValue = null;
    this.saleReport.endValue = null;
    this.saleReport.idPerson = null;
    this.saleReport.idProduct = null;
    this.personSelected = null;
    this.productSelected = null;


  }

}
