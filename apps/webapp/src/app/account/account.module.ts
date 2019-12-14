import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiSharedModule } from '@guiseek/ui/shared';


const routes: Routes = [
  { path: '', component: AccountComponent }
];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UiSharedModule,
    RouterModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
