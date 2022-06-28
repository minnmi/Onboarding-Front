import {Component, OnInit} from '@angular/core';
import {IPersonReport} from "../../../shared/interface/IPersonReport";
import {IPerson} from "../../../shared/interface/IPerson";
import {TypeEnum} from "../../../shared/enums/TypeEnum";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {PersonService} from "../../../services/person.service";
import {Router} from "@angular/router";
import {PersonStatusEnum} from "../../../shared/enums/PersonStatusEnum";
import {ReportPersonService} from "../../../services/report-person.service";

@Component({
  selector: 'app-report-person',
  templateUrl: './report-person.component.html',
  styleUrls: ['./report-person.component.scss']
})
export class ReportPersonComponent implements OnInit {
  personReport = {} as IPersonReport;
  persons: IPerson[] = [];
  personFiltereds: IPerson[] = [];
  personSelected: IPerson | null = {} as IPerson;
  tipo: SelectItem[] = [{label: "FISICO", value: TypeEnum.F}, {label: "JURIDICA", value: TypeEnum.J}];

  constructor(
    private personService: PersonService,
    private reportPersonService: ReportPersonService,
    private rotas: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  async ngOnInit() {
    await this.getPersons();
    this.personReport.personType = TypeEnum.F;
  }

  async getPersons() {
    const {success, data} = await this.personService.listar('', PersonStatusEnum.ATIVO, TypeEnum.F);
    if (success) {
      this.persons = data;
    }
  }

  personsSearch(event: any): void {
    const namePerson = event.query;
    this.personFiltereds = [];

    this.personFiltereds = this.persons.filter(person =>
      person.name.toLowerCase().includes(namePerson.toLowerCase()));
  }

  onSelectPerson(person: IPerson) {
    this.personReport.idPerson = person.id as number;
  }

  async reportBuilder() {
    const report = await this.reportPersonService.getReport(this.personReport);
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
    this.personReport.idPerson = null;
    this.personReport.personType = TypeEnum.F;
    this.personSelected = null;


  }

}
