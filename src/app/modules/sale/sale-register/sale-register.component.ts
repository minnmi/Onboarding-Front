import {Component, OnInit} from '@angular/core';
import {ISale} from "../../../shared/interface/ISale";
import {IProduct} from "../../../shared/interface/IProduct";
import {IPerson} from "../../../shared/interface/IPerson";
import {MessageService} from "primeng/api";
import {PersonService} from "../../../services/person.service";
import {ProductService} from "../../../services/product.service";
import {SaleService} from "../../../services/sale.service";
import {PersonStatusEnum} from "../../../shared/enums/PersonStatusEnum";
import {TypeEnum} from "../../../shared/enums/TypeEnum";
import {ProductStatusEnum} from "../../../shared/enums/ProductStatusEnum";

@Component({
  selector: 'app-sale-register',
  templateUrl: './sale-register.component.html',
  styleUrls: ['./sale-register.component.scss']
})
export class SaleRegisterComponent implements OnInit {

  sale: ISale = {} as ISale;
  persons: IPerson[] = [];
  personFiltereds: IPerson[] = [];
  personSelected: IPerson = {} as IPerson;
  products: IProduct[] = [];
  productFiltereds: IProduct[] = [];
  product: IProduct = {} as IProduct;
  productSelected: IProduct = {} as IProduct;
  totalValue = 0;
  totalDiscount = 0;
  quantity = 1;

  constructor(
    private personService: PersonService,
    private productService: ProductService,
    private saleService: SaleService,
    private messageService: MessageService
  ) {
  }

  async ngOnInit() {
    await this.getPersons();
    await this.getProducts();
    this.sale.saleProductList = [];
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

  clickAdd() {
    let index = this.products.indexOf(this.product);
    this.products[index].quantity -= this.quantity;
    this.totalValue += this.product.value * this.quantity;
    this.totalDiscount += this.product.discountValue
    this.sale.saleProductList.push({...this.product, quantity: this.quantity, idProduct: this.product.id});
    console.log(this.totalValue);
    // this.product = null;
  }


  async clickSave(): Promise<void> {
    this.sale.totalValue = this.totalValue;
    this.sale.valueDiscount = this.totalDiscount;
    console.log(this.totalValue);
    console.log(this.totalDiscount);

    this.saleService.salvar(this.sale).then(sucesso => {
      this.messageService.add({
        severity: 'sucess',
        summary: 'Venda',
        detail: 'Venda cadastrada com sucesso',
      });
      setTimeout(function () {
        window.location.href = '/'
      }, 1100);
    }).catch(err => {
      this.messageService.add({
        severity: 'error',
        summary: 'Venda',
        detail: 'Erro ao cadastrar venda'
      });
    })

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
    this.sale.idPerson = person.id as number;
  }

  onSelectProduct(product: IProduct) {
    this.product = product;
  }


}
