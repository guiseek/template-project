import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { CoreSharedAuthModule } from '@guiseek/core/shared/auth';

const routes: Routes = [{ path: '', component: AccountComponent }];

@NgModule({
  imports: [CoreSharedAuthModule.forRoot({}), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
