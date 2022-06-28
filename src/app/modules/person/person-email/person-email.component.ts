import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IEmail} from "../../../shared/interface/IEmail";
import {EmailDefaultEnum} from "../../../shared/enums/EmailDefaultEnum";
import {ConfirmationService, MessageService} from "primeng/api";
import {EmailService} from "../../../services/email.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-person-email',
  templateUrl: './person-email.component.html',
  styleUrls: ['./person-email.component.scss']
})
export class PersonEmailComponent implements OnInit {
  emails: IEmail[] = [];
  emailDefault: EmailDefaultEnum = EmailDefaultEnum.EMPTY;
  defaultOptions: any[] = [{name: "Sim", key: EmailDefaultEnum.S}, {
    name: "Não", key: EmailDefaultEnum.N
  }];
  email = '';
  selectedOption: any = null;
  idPerson: number | null = null;

  indexOfEmail: any;
  editing = false;

  @Output() addEmail = new EventEmitter<IEmail[]>();

  constructor(
    private emailService: EmailService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.idPerson = +queryParams['idPerson'];
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadEmail();
  }

  clearFields(): void {
    this.email = '';
    this.selectedOption = null;
    this.indexOfEmail = null;
    this.editing = false;
  }

  filledFields(): boolean {
    return !!this.email;

  }

  async loadEmail(): Promise<void> {
    if (!this.idPerson) {
      this.emails = [];
      return;
    }

    const {success, data} = await this.emailService
      .buscar(this.idPerson!);

    if (success) {
      this.emails = data;
    }
    this.addEmail.emit(this.emails);
  }

  async clickAdd(): Promise<void> {
    if (!this.filledFields()) {
      return;
    }
    const email = {
      email: this.email,
      emailDefault: this.selectedOption ? this.selectedOption.key : 'N'
    } as IEmail;


    if (this.editing) {
      this.emails[this.indexOfEmail] = email;
    } else {
      this.emails.push(email);
    }
    this.addEmail.emit(this.emails);
    this.clearFields();
  }

  clickEdit(email: IEmail): void {
    this.editing = true;
    this.indexOfEmail = this.emails.indexOf(email);
    this.email = email.email;
    this.selectedOption = (email.emailDefault === 'S' ?
      this.defaultOptions[0] : this.defaultOptions[1]);

  }

  clickDelete(index: number) {
    if (this.emails[index].emailDefault !== EmailDefaultEnum.S) {
      this.emails.splice(index, 1);
      return;
    }
    setTimeout(() => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Não é possível excluir um email padrão!'
      });
    }, 0);
  }

  setAsDefault(index: number) {
    this.emails.forEach(email => email.emailDefault = EmailDefaultEnum.N);
    this.emails[index].emailDefault = EmailDefaultEnum.S;
  }

  toEmail(email: any) {
    return email as IEmail;
  }

}
