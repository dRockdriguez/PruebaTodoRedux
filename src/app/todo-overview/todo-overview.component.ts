import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, saveState } from '../store';
import { REMOVE_ALL_TODOS } from '../actions';
import { TodosServiceService } from '../todos-service.service'

@Component({
  selector: 'app-todo-overview',
  templateUrl: './todo-overview.component.html',
  styleUrls: ['./todo-overview.component.css']
})
export class TodoOverviewComponent implements OnInit {
  @select() todos;
  @select() lastUpdate;
  @select() saludo;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private service: TodosServiceService
  ) { }

  ngOnInit() {
  }

  clearTodos() {
    this.ngRedux.dispatch({type: REMOVE_ALL_TODOS});
    saveState(this.ngRedux.getState());
  }
}
