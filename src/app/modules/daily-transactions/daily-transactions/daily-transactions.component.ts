import {Component, OnInit} from '@angular/core';
import {IDailyTransactionsRequest, IDailyTransactionsResult} from "../../../shared/interface/IDailyTransactionsResult";
import {SaleStatusEnum} from "../../../shared/enums/SaleStatusEnum";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {DailyTransactionsService} from "../../../services/daily-transactions.service";
import {Router} from "@angular/router";
import {IPerson} from "../../../shared/interface/IPerson";
import {IProduct} from "../../../shared/interface/IProduct";
import * as moment from "moment";
import {PersonStatusEnum} from "../../../shared/enums/PersonStatusEnum";
import {TypeEnum} from "../../../shared/enums/TypeEnum";
import {ProductStatusEnum} from "../../../shared/enums/ProductStatusEnum";
import {PersonService} from "../../../services/person.service";
import {ProductService} from "../../../services/product.service";


@Component({
  selector: 'app-daily-transactions',
  templateUrl: './daily-transactions.component.html',
  styleUrls: ['./daily-transactions.component.scss']
})
export class DailyTransactionsComponent implements OnInit {

  dailyTransactionsResults: IDailyTransactionsResult[] = [];

  dailyTransactionsRequest: IDailyTransactionsRequest = {} as IDailyTransactionsRequest;
  persons: IPerson[] = [];
  personFiltereds: IPerson[] = [];
  personSelected: IPerson | null = {} as IPerson;
  products: IProduct[] = [];
  productFiltereds: IProduct[] = [];
  productSelected: IProduct | null = {} as IProduct;

  status: SaleStatusEnum = SaleStatusEnum.ABERTO;
  statusOptions: SelectItem[] = [
    {label: "ABERTO", value: SaleStatusEnum.ABERTO},
    {label: "CONCLUIDO", value: SaleStatusEnum.CONCLUIDO},
    {label: "CANCELADO", value: SaleStatusEnum.CANCELADO}
  ];


  loading!: boolean;
  buscar!: string;
  primeiroRegistroPagina = 0;
  ultimoRegistroPagina = 10;
  totalRegistros = 0;
  rows = 10;

  constructor(
    private dailyTransactionsService: DailyTransactionsService,
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
    await this.loadData();

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
    return this.dailyTransactionsResults ?
      this.primeiroRegistroPagina === (this.dailyTransactionsResults.length - this.rows) : true;
  }

  async loadData() {
    const response = await this.dailyTransactionsService.listar(this.dailyTransactionsRequest);
    if (!response.success) {
      return;
    }
    this.dailyTransactionsResults = response.data;
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

  async limpar() {
    this.dailyTransactionsRequest.startDate = null;
    this.dailyTransactionsRequest.endDate = null;
    this.dailyTransactionsRequest.startValue = null;
    this.dailyTransactionsRequest.endValue = null;
    this.dailyTransactionsRequest.userSale = null;
    this.dailyTransactionsRequest.status = null;
    this.dailyTransactionsRequest.idPerson = null;
    this.dailyTransactionsRequest.idProduct = null;
    this.personSelected = null;
    this.productSelected = null;


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
    this.dailyTransactionsRequest.idPerson = person.id as number;
  }

  onSelectProduct(product: IProduct) {
    this.dailyTransactionsRequest.idProduct = product.id as number;
  }

  formatUS(date?: Date): string | null {
    return moment(date).format('DD/MM/YYYY')
  }

  async reportBuilder() {
    console.log(this.dailyTransactionsRequest);
    const report = await this.dailyTransactionsService.getReport(this.dailyTransactionsRequest);
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


}
