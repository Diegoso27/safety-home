import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'emergency-procedures',
    loadChildren: () => import('./emergency-procedures/emergency-procedures.module').then( m => m.EmergencyProceduresPageModule)
  },
  {
    path: 'select-property',
    loadChildren: () => import('./select-property/select-property.module').then( m => m.SelectPropertyPageModule)
  },
  {
    path: 'children',
    loadChildren: () => import('./children/children.module').then( m => m.ChildrenPageModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksPageModule)
  },
  {
    path: 'fire',
    loadChildren: () => import('./fire/fire.module').then( m => m.FirePageModule)
  },
  {
    path: 'earthquake',
    loadChildren: () => import('./earthquake/earthquake.module').then( m => m.EarthquakePageModule)
  },
  {
    path: 'health',
    loadChildren: () => import('./health/health.module').then( m => m.HealthPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
