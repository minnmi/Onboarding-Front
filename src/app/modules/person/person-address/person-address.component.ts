import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AddressDefaultEnum} from "../../../shared/enums/AddressDefaultEnum";
import {ConfirmationService, MessageService} from "primeng/api";
import {IAddress} from "../../../shared/interface/IAddress";
import {AddressService} from "../../../services/address.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-person-address',
  templateUrl: './person-address.component.html',
  styleUrls: ['./person-address.component.scss']
})
export class PersonAddressComponent implements OnInit {
  addresses: IAddress[] = [];
  addressDefault: AddressDefaultEnum = AddressDefaultEnum.EMPTY;
  defaultOptions: any[] = [{name: "Sim", key: AddressDefaultEnum.S}, {
    name: "Não", key: AddressDefaultEnum.N
  }];
  place = '';
  neighborhood = '';
  cep = '';
  city = '';
  uf = '';
  selectedOption: any = null;
  idPerson: number | null = null;

  indexOfAddress: any;
  editing = false;

  @Output() addAddress = new EventEmitter<IAddress[]>();

  constructor(
    private addressService: AddressService,
    private activatedRoute: ActivatedRoute, //toDO: arrumar os outros activated
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.idPerson = +queryParams['idPerson'];
    });

  }

  async ngOnInit(): Promise<void> {
    await this.loadAddress();
  }


  clearFields(): void {
    this.place = '';
    this.neighborhood = '';
    this.cep = '';
    this.city = '';
    this.uf = '';
    this.selectedOption = null;
    this.indexOfAddress = null;
    this.editing = false;
  }

  filledFields(): boolean {
    return !!this.place
      && !!this.neighborhood
      && !!this.cep
      && !!this.city
      && !!this.uf;

  }

  async loadAddress(): Promise<void> {
    if (!this.idPerson) {
      this.addresses = [];
      return;
    }

    const {success, data} = await this.addressService
      .buscar(this.idPerson!);

    if (success) {
      this.addresses = data;
    }
    this.addAddress.emit(this.addresses);
  }

  async clickAdd(): Promise<void> {
    if (!this.filledFields()) {
      return;
    }
    const address = {
      place: this.place,
      neighborhood: this.neighborhood,
      cep: this.cep,
      city: this.city,
      uf: this.uf,
      addressDefault: this.selectedOption ? this.selectedOption.key : 'N'
    } as IAddress;


    if (this.editing) {
      this.addresses[this.indexOfAddress] = address;
    } else {
      this.addresses.push(address);
    }

    this.addAddress.emit(this.addresses);
    this.clearFields();
  }

  clickEdit(address: IAddress) {
    this.editing = true;
    this.indexOfAddress = this.addresses.indexOf(address);
    this.place = address.place;
    this.neighborhood = address.neighborhood;
    this.cep = address.cep;
    this.city = address.city;
    this.uf = address.uf;
    this.selectedOption = (address.addressDefault === 'S' ?
      this.defaultOptions[0] : this.defaultOptions[1]);

  }

  clickDelete(index: number) {
    if (this.addresses[index].addressDefault !== AddressDefaultEnum.S) {
      this.addresses.splice(index, 1);
      return;
    }
    setTimeout(() => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Não é possível excluir um endereço padrão!'
      });
    }, 0);
  }

  setAsDefault(index: number) {
    this.addresses.forEach(address => address.addressDefault = AddressDefaultEnum.N);
    this.addresses[index].addressDefault = AddressDefaultEnum.S;
  }

  toAddress(address: any) {
    return address as IAddress;
  }

  getCepMask() {
    return '99999-999';
  }
}
