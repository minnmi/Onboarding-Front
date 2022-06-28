import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IPhone} from "../../../shared/interface/IPhone";
import {PhoneDefaultEnum} from "../../../shared/enums/PhoneDefaultEnum";
import {ConfirmationService, MessageService} from "primeng/api";
import {PhoneTypeEnum} from "../../../shared/enums/PhoneTypeEnum";
import {PhoneService} from "../../../services/phone.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-person-phone',
  templateUrl: './person-phone.component.html',
  styleUrls: ['./person-phone.component.scss']
})
export class PersonPhoneComponent implements OnInit {
  phones: IPhone[] = [];
  phoneDefault: PhoneDefaultEnum = PhoneDefaultEnum.EMPTY;
  defaultOptions: any[] = [{name: "Sim", key: PhoneDefaultEnum.S}, {
    name: "Não", key: PhoneDefaultEnum.N
  }];
  phoneType: PhoneTypeEnum = PhoneTypeEnum.EMPTY;
  type: any[] = [{name: "Residencial", key: PhoneTypeEnum.RESIDENCIAL}, {
    name: "Celular", key: PhoneTypeEnum.CELULAR
  }];
  phone = '';
  selectedOption: any = null;
  selectedPhone: any = null;
  idPerson: number | null = null;

  indexOfPhone: any;
  editing = false;

  @Output() addPhone = new EventEmitter<IPhone[]>();

  constructor(
    private phoneService: PhoneService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.idPerson = +queryParams['idPerson'];
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadPhone();
  }

  clearFields(): void {
    this.phone = '';
    this.selectedPhone = null;
    this.selectedOption = null;
    this.indexOfPhone = null;
    this.editing = false;

  }

  filledFields(): boolean {
    return !!this.phone
      && !!this.selectedPhone;

  }

  async loadPhone(): Promise<void> {
    if (!this.idPerson) {
      this.phones = [];
      return;
    }

    const {success, data} = await this.phoneService
      .buscar(this.idPerson!);

    if (success) {
      this.phones = data;
    }
    this.addPhone.emit(this.phones);
  }

  async clickAdd(): Promise<void> {
    if (!this.filledFields()) {
      return;
    }
    const phone = {
      phone: this.phone,
      phoneDefault: this.selectedOption ? this.selectedOption.key : 'N',
      phoneType: this.selectedPhone.key
    } as IPhone;


    if (this.editing) {
      this.phones[this.indexOfPhone] = phone;
    } else {
      this.phones.push(phone);
    }

    this.addPhone.emit(this.phones);
    this.clearFields();
  }

  clickEdit(phone: IPhone) {
    this.editing = true;
    this.indexOfPhone = this.phones.indexOf(phone);
    this.phone = phone.phone;
    this.selectedOption = (phone.phoneDefault === 'S' ?
      this.defaultOptions[0] : this.defaultOptions[1]);
    this.selectedPhone = phone.phoneType === PhoneTypeEnum.RESIDENCIAL ?
      this.type[0] : this.type[1];

  }

  clickDelete(index: number) {
    if (this.phones[index].phoneDefault !== PhoneDefaultEnum.S) {
      this.phones.splice(index, 1);
      return;
    }
    setTimeout(() => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Não é possível excluir um telefone padrão!'
      });
    }, 0);
  }

  setAsDefault(index: number) {
    this.phones.forEach(phone => phone.phoneDefault = PhoneDefaultEnum.N);
    this.phones[index].phoneDefault = PhoneDefaultEnum.S;
  }

  toPhone(phone: any) {
    return phone as IPhone;
  }

}
