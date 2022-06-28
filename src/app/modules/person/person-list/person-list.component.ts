import {Component, OnInit} from '@angular/core';
import {IPerson} from "../../../shared/interface/IPerson";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {TypeEnum} from "../../../shared/enums/TypeEnum";
import {PersonService} from "../../../services/person.service";
import {Router} from "@angular/router";
import {PersonStatusEnum} from "../../../shared/enums/PersonStatusEnum";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  persons: IPerson[] = [];
  status: PersonStatusEnum = PersonStatusEnum.EMPTY;
  situacoes: SelectItem[] = [{label: "ATIVO", value: PersonStatusEnum.ATIVO}, {
    label: "INATIVO",
    value: PersonStatusEnum.INATIVO
  }];
  type: TypeEnum = TypeEnum.F;
  tipo: SelectItem[] = [{label: "FISICO", value: TypeEnum.F}, {label: "JURIDICA", value: TypeEnum.J}];
  nome: string = '';
  loading!: boolean;
  buscar!: string;
  primeiroRegistroPagina = 0;
  ultimoRegistroPagina = 10;
  totalRegistros = 0;
  rows = 10;

  constructor(
    private personService: PersonService,
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
    return this.persons ?
      this.primeiroRegistroPagina === (this.persons.length - this.rows) : true;
  }

  async loadData() {
    const response = await this.personService.listar(this.nome, this.status, this.type);
    if (!response?.success) {
      return;
    }
    this.persons = response.data;
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
    await this.rotas.navigate(['/person/person-register'])
  }

  async clickEditar(idPerson: number): Promise<void> {
    await this.rotas.navigate(['/person/person-register'], {queryParams: {idPerson}})
  }

  async limpar() {
    this.nome = '';
    this.status = PersonStatusEnum.EMPTY;
    this.type = TypeEnum.F;
    await this.loadData();
  }

  async clickExcluir(event: any, idPerson: number): Promise<void> {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Deseja excluir este cliente?',
      key: 'deleteConfirm',
      rejectLabel: 'Não',
      acceptLabel: 'Sim',
      accept: async () => {
        try {
          await this.personService.delete(idPerson);
          this.persons = this.persons
            .filter(person => (person.id !== idPerson));

          this.messageService.add({
            severity: 'success',
            summary: 'Ok',
            detail: 'Cliente excluído com sucesso'
          });
        } catch (e) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao excluir',
            detail: 'Verifique se o cliente possui registros relacionados'
          });
        }
      },
    });
  }

  getStatus(person: IPerson) {
    switch (person.status) {
      case PersonStatusEnum.ATIVO:
        return 'ATIVO';
      case PersonStatusEnum.INATIVO:
        return 'INATIVO';
      case PersonStatusEnum.EMPTY:
        return '';
    }
  }

}
