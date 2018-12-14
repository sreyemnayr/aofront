import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { FlowComponent } from '@app/admin/flow/flow.component';
import { AdminComponent } from '@app/admin/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'flow',

        pathMatch: 'full'
      },
      {
        path: 'flow',
        component: FlowComponent,
        canActivate: [AuthGuardService],
        data: { title: 'Flow' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
