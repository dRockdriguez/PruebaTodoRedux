import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
//Redux
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE, recoverState } from './store';
import { TodoOverviewComponent } from './todo-overview/todo-overview.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HttpClientModule } from '@angular/common/http'


import { TodosServiceService } from './todos-service.service';

import { APP_ROUTING } from './app.router';
import { PruebaComponentComponent } from './prueba-component/prueba-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoOverviewComponent,
    TodoListComponent,
    PruebaComponentComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [TodosServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
  //Activamos la store inyectando el ngRedux, y guardando el estado inicial
  constructor(ngRedux: NgRedux<IAppState>){
    if(recoverState()){
      INITIAL_STATE.todos = recoverState().todos;
      INITIAL_STATE.lastUpdate = recoverState().lastUpdate;
    }
    ngRedux.configureStore(rootReducer, INITIAL_STATE);

  }
}
