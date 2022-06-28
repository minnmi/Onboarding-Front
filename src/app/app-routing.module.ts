import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'home'
},
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'person',
    loadChildren: () => import('./modules/person/person.module').then(m => m.PersonModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'sale',
    loadChildren: () => import('./modules/sale/sale.module').then(m => m.SaleModule)
  },
  {
    path: 'daily-transactions',
    loadChildren: () => import('./modules/daily-transactions/daily-transactions.module').then(m => m.DailyTransactionsModule)
  },
  {
    path: 'report-sale',
    loadChildren: () => import('./modules/report-sale/report-sale.module').then(m => m.ReportSaleModule)
  },
  {
    path: 'report-product',
    loadChildren: () => import('./modules/report-product/report-product.module').then(m => m.ReportProductModule)
  },
  {
    path: 'report-person',
    loadChildren: () => import('./modules/report-person/report-person.module').then(m => m.ReportPersonModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    useHash: true,
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

