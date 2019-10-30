import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../services/firestore.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FirestoreService
  ]
})
export class FireStorageModule { }
