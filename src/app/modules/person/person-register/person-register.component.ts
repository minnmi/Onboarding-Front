import {Component, OnInit} from '@angular/core';
import {IPerson} from "../../../shared/interface/IPerson";
import {PersonStatusEnum} from "../../../shared/enums/PersonStatusEnum";
import {MessageService} from "primeng/api";
import {TypeEnum} from "../../../shared/enums/TypeEnum";
import {GenderEnum} from "../../../shared/enums/GenderEnum";
import {IAddress} from "../../../shared/interface/IAddress";
import {IPhone} from "../../../shared/interface/IPhone";
import {IEmail} from "../../../shared/interface/IEmail";
import {PersonService} from "../../../services/person.service";
import {AddressService} from "../../../services/address.service";
import {PhoneService} from "../../../services/phone.service";
import {EmailService} from "../../../services/email.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-person-register',
  templateUrl: './person-register.component.html',
  styleUrls: ['./person-register.component.scss']
})
export class PersonRegisterComponent implements OnInit {
  person: IPerson = {} as IPerson;
  addresses: IAddress[] = [];
  phones: IPhone[] = [];
  emails: IEmail[] = [];
  idPerson: number | null = null;
  status: PersonStatusEnum = PersonStatusEnum.EMPTY;
  situacoes: any[] = [{name: "ATIVO", key: PersonStatusEnum.ATIVO}, {
    name: "INATIVO",
    key: PersonStatusEnum.INATIVO
  }];
  type: TypeEnum = TypeEnum.F;
  tipo: any[] = [{name: "FISICO", key: TypeEnum.F}, {name: "JURIDICA", key: TypeEnum.J}];
  gender: GenderEnum | null = GenderEnum.EMPTY;
  sexo: any[] = [{name: "FEMININO", key: GenderEnum.F}, {name: "MASCULINO", key: GenderEnum.M}];
  name: string = '';
  document = '';
  birth: Date | null = null;
  inscricaoEstadual: string | null = '';


  constructor(
    private personService: PersonService,
    private addressService: AddressService,
    private phoneService: PhoneService,
    private emailService: EmailService,
    private rotas: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.idPerson = +queryParams['idPerson'];
    });
  }


  async ngOnInit(): Promise<void> {
    if (this.idPerson) {
      await this.loadPerson(+this.idPerson);
    }
  }

  addAddress($event: IAddress[]): void {
    this.addresses = $event;
  }

  addPhone($event: IPhone[]): void {
    this.phones = $event;
  }

  addEmail($event: IEmail[]): void {
    this.emails = $event;
  }

  async save(): Promise<void> {
    const fisicaPerson = this.type === 'F';

    const request: IPerson = {
      name: this.name,
      birth: fisicaPerson ? this.birth : null,
      document: this.document,
      gender: fisicaPerson ? this.gender : null,
      status: this.status,
      inscricaoEstadual: !fisicaPerson ? this.inscricaoEstadual : null,
      type: this.type,
      addresses: this.addresses,
      phones: this.phones,
      emails: this.emails

    };

    if (this.idPerson === null) {
      return;
    }
    try {
      this.idPerson
        ? await this.personService.editar(this.idPerson, request)
        : await this.personService.salvar(request);

    } catch (e) {
      this.errorMessage('Atenção', 'Houve um erro ao salvar o cliente!');
      return;
    }


    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Ok',
        detail: 'Cliente editado com sucesso!'
      });
    }, 0)

    await this.rotas.navigate(['/person'])
  }

  async loadPerson(idPerson: number): Promise<void> {
    const {success, data} = await this.personService.buscar(idPerson);
    if (success) {
      this.type = data.type;
      this.status = data.status;
      this.gender = data.gender;
      this.name = data.name;
      this.document = data.document;
      this.birth = data.birth;
      this.inscricaoEstadual = data.inscricaoEstadual;
    }
  }

  async cancel(): Promise<void> {
    await this.rotas.navigate(['/person']);
  }

  clean(): void {
    this.type = TypeEnum.F;
    this.status = PersonStatusEnum.EMPTY;
    this.gender = GenderEnum.EMPTY;
    this.name = '';
    this.document = '';
    this.birth = null;
    this.inscricaoEstadual = '';

  }

  getDocumentLabel() {
    return this.type === TypeEnum.F ? 'CPF' : 'CNPJ';
  }

  isNaturalPerson() {
    return this.type === TypeEnum.F;
  }

  isLegalPerson() {
    return this.type === TypeEnum.J;
  }

  getNameLabel() {
    return `Nome${this.type === TypeEnum.F ? '' : '/Razão Social'}`;
  }

  getDocumentMask() {
    return this.isNaturalPerson() ? "999.999.999-99" : "99.999.999/9999-99";
  }

  getBirthMask() {
    return '99/99/9999';
  }

  private errorMessage(summary: string, detail: string) {
    setTimeout(() => {
      this.messageService.add({
        severity: 'error',
        summary: summary,
        detail: detail
      });
    }, 0);
  }
}
