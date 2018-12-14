import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { ApplicationsComponent } from './applications/applications.component';
import { NewstudentComponent } from './newstudent/newstudent.component';
import { FamilyComponent } from '@app/applications/family/family.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    children: [
      {
        path: '',
        redirectTo: 'students',

        pathMatch: 'full'
      },
      {
        path: 'students',
        component: NewstudentComponent,
        canActivate: [AuthGuardService],
        data: { title: 'aofront.applications.menu.newstudent' }
      },
      {
        path: 'families',
        component: FamilyComponent,
        canActivate: [AuthGuardService],
        data: { title: 'Families' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {}
