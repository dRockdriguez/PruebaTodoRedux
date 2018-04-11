import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, saveState, recoverState } from '../store';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions';
import { ITodo } from '../todo';
import { TodosServiceService } from '../todos-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @select() todos;
  @select() saludo;

  model: ITodo = {
    id: 0,
    description: "",
    responsible: "",
    priority: "low",
    isCompleted: false
  };

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private service: TodosServiceService,
    private router: Router
  ) {

      this.ngRedux.dispatch({type: "RECOVER_STATE", todo:{} });

      if(this.ngRedux.getState().saludo.length <= 0)
            service.getTodos();

  }

  ngOnInit() {
  }

  onSubmit() {
   this.ngRedux.dispatch({type: ADD_TODO, todo: this.model});
   saveState(this.ngRedux.getState());

   this.router.navigate(['prueba']);

  }

  toggleTodo(todo) {
     this.ngRedux.dispatch({ type: TOGGLE_TODO, id: todo.id });
     saveState(this.ngRedux.getState());
  }

 removeTodo(todo) {
    this.ngRedux.dispatch({type: REMOVE_TODO, id: todo.id });
    saveState(this.ngRedux.getState());
 }

}
