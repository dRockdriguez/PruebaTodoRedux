import { RouterModule, Routes } from '@angular/router';
import { PruebaComponentComponent } from './prueba-component/prueba-component.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const APP_ROUTES: Routes = [
  { path: 'prueba', component: PruebaComponentComponent },
  { path: 'lista', component: TodoListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'lista' },
  { path: '**',  pathMatch: 'full',  redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
