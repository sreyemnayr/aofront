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
        path: 'todos',
        component: TodosContainerComponent,
        data: { title: 'aofront.applications.menu.todos' }
      },
      {
        path: 'stock-market',
        component: StockMarketContainerComponent,
        data: { title: 'aofront.applications.menu.stocks' }
      },
      {
        path: 'theming',
        component: ParentComponent,
        data: { title: 'aofront.applications.menu.theming' }
      },
      {
        path: 'crud',
        redirectTo: 'crud/',
        pathMatch: 'full'
      },
      {
        path: 'crud/:id',
        component: CrudComponent,
        data: { title: 'aofront.applications.menu.crud' }
      },
      {
        path: 'form',
        component: FormComponent,
        data: { title: 'aofront.applications.menu.form' }
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: { title: 'aofront.applications.menu.notifications' }
      },
      {
        path: 'students',
        component: NewstudentComponent,
        canActivate: [AuthGuardService],
        data: { title: 'aofront.applications.menu.newstudent' }
      },
      {
        path: 'authenticated',
        component: AuthenticatedComponent,
        canActivate: [AuthGuardService],
        data: { title: 'aofront.applications.menu.auth' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {}
