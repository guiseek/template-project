import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardsComponent } from './boards/boards.component';
import { GridBoardsComponent } from './grid-boards/grid-boards.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Dashboard'
    },
    children: [
      {
        path: '',
        component: BoardsComponent,
        data: {
          breadcrumb: 'Boards'
        }
      },
      {
        path: 'grid',
        component: GridBoardsComponent,
        data: {
          breadcrumb: 'Grade'
        }
      }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, BoardsComponent, GridBoardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
    // DashboardRoutingModule
  ]
})
export class DashboardModule { }
