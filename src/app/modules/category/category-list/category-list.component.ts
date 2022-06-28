import {Component, OnInit} from "@angular/core";
import {ICategory} from "../../../shared/interface/ICategory";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {StatusEnum} from "../../../shared/enums/StatusEnum";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-category-list',
  templateUrl: '/category-list.component.html',
  styleUrls: ['category-list.component.scss']
})

export class CategoryListComponent implements OnInit {
  categories: ICategory[] = [];
  status: StatusEnum = StatusEnum.EMPTY;
  situacoes: SelectItem[] = [
    {label: "ATIVO", value: StatusEnum.ATIVO},
    {label: "INATIVO", value: StatusEnum.INATIVO}
  ];
  nome: string = "";
  loading!: boolean;
  buscar!: string;
  primeiroRegistroPagina = 0;
  ultimoRegistroPagina = 10;
  totalRegistros = 0;
  rows = 10;

  constructor(
    private categoryService: CategoryService,
    private rotas: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }


  async ngOnInit() {
    await this.loadData();
    console.log(this.situacoes);
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
    return this.categories ?
      this.primeiroRegistroPagina === (this.categories.length - this.rows) : true;
  }

  async loadData() {
    const response = await this.categoryService.listar(this.nome, this.status);
    if (!response?.success) {
      return;
    }
    this.categories = response.data;
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
    await this.rotas.navigate(['/category/category-register'])
  }

  async clickEditar(idCategory: number): Promise<void> {
    await this.rotas.navigate(['/category/category-register'], {queryParams: {idCategory}})
  }

  async limpar() {
    this.nome = '';
    this.status = StatusEnum.EMPTY;
    await this.loadData();
  }

  async clickExcluir(event: any, idCategory: number): Promise<void> {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Deseja excluir esta categoria?',
      key: 'deleteConfirm',
      rejectLabel: 'Não',
      acceptLabel: 'Sim',
      accept: async () => {
        try {
          await this.categoryService.delete(idCategory);
          this.categories = this.categories
            .filter(category => (category.idCategory !== idCategory));

          this.messageService.add({
            severity: 'success',
            summary: 'Ok',
            detail: 'Categoria excluída com sucesso'
          });
        } catch (e) {
          console.log(e);

          this.messageService.add({
            severity: 'Erro',
            summary: 'Erro ao excluir',
            detail: 'Verifique se a categoria possui registros relacionados'
          });
        }
      },
    });
  }


}

