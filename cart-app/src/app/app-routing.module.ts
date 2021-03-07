import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./cart-summary/cart-summary.module').then(
        (m) => m.CartSummaryModule
      ),
  },
  {
    path: 'cart-summary',
    loadChildren: () =>
      import('./cart-summary/cart-summary.module').then(
        (m) => m.CartSummaryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
