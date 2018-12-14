import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { ApplicationsComponent } from './applications/applications.component';
import { ParentComponent } from './theming/parent/parent.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { CrudComponent } from './crud/components/crud.component';
import { FormComponent } from './form/components/form.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
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
