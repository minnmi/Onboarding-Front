import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.setItems();
  }

  setItems() {
    this.items = [{
      label: 'Página Inicial',
      icon: 'fa fa-bar-chart',
      routerLink: ['']
    },
      {
        label: 'Cadastro',
        icon: 'fa fa-registered',
        items: [
          {
            label: 'Cliente',
            routerLink: ['/person']
          },
          {
            label: 'Categoria',
            routerLink: ['/category']
          },
          {
            label: 'Produto',
            routerLink: ['/product']
          },
        ]
      },
      {
        label: 'Venda',
        icon: 'fa fa-dollar',
        items: [
          {
            label: 'Incluir Venda',
            routerLink: ['/sale']
          },
        ]
      },
      {
        label: 'Consulta',
        icon: 'fa fa-search',
        items: [
          {
            label: 'Movimentação Diária',
            routerLink: ['/daily-transactions']
          },
        ]
      },
      {
        label: 'Relatório',
        icon: 'fa fa-bars',
        items: [
          {
            label: 'Relatório por venda',
            routerLink: ['/report-sale']
          },
          {
            label: 'Relatório de produtos',
            routerLink: ['/report-product']
          },
          {
            label: 'Relatório de cliente',
            routerLink: ['/report-person']
          }
        ]
      }
    ];
  }
}
