import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ToursComponent } from './tours/tours.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'aofront.menu.about' }
  },
  {
    path: 'tours',
    component: ToursComponent,
    data: { title: 'aofront.menu.tours' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
