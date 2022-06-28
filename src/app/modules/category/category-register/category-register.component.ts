import {Component, OnInit} from '@angular/core';
import {ICategory} from "../../../shared/interface/ICategory";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-category-register',
  templateUrl: './category-register.component.html',
  styleUrls: ['./category-register.component.scss']
})
export class CategoryRegisterComponent implements OnInit {
  category: ICategory = {} as any;
  idCategoryExist!: number | null;


  constructor(
    private categoryService: CategoryService,
    private rotas: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {

  }

  async loadCategory(idCategory: number): Promise<void> {
    const {success, data} = await this.categoryService.buscar(idCategory);
    if (success) {
      this.category = data;
    }
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.idCategoryExist = +queryParams['idCategory'];
    });
    if (this.idCategoryExist) {
      await this.loadCategory(+this.idCategoryExist);
      console.log(this.category);
    }
  }


  async clickSalvar(): Promise<void> {
    try {
      if (this.idCategoryExist) {
        await this.categoryService.editar(this.idCategoryExist, this.category);
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Ok',
            detail: 'Categoria editada com sucesso!'
          });
        }, 0)
      } else {
        await this.categoryService.salvar(this.category);
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Ok',
            detail: 'Categoria criada com sucesso!'
          });
        }, 0)
      }
      await this.rotas.navigate(['/category']);
    } catch (e) {

    }
  }
}
