import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: 'auth',
  loadChildren: () => import('@guiseek/customer/lazy/auth').then(module => module.CustomerLazyAuthModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthCustomerRoutingModule { }
