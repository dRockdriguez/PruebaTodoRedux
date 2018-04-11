import { ITodo } from './todo';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, REMOVE_ALL_TODOS, SAVE_STATE, RECOVE_STATE } from './actions';

export interface IAppState{
  todos: ITodo[];
  lastUpdate: Date;
  saludo: string;
}

//Estado inicial
export const INITIAL_STATE: IAppState = {
    todos: [],
    lastUpdate: null,
    saludo: ""
}

export function rootReducer(state: IAppState, action): IAppState{
  console.log(state);

  switch(action.type){
    case "PRUEBA_ASYNC":
      return Object.assign({}, state)
    case "PRUEBA_ASYNC_SUCCESS":
      return Object.assign({}, state, {
        todos: state.todos,
        lastUpdate: new Date(),
        saludo: action.payload
      });
    case "PRUEBA_ASYNC_ERROR":
      console.log("PRUEBA_ASYNC_ERROR");
        return Object.assign({}, state)
    case "RECOVER_STATE":
      if(recoverState())
        return Object.assign({}, state, {
          todos: recoverState().todos,
          lastUpdate: new Date(),
          saludo: recoverState().saludo
        });
      else
        return Object.assign({}, state, {
          todos: [],
          lastUpdate: new Date(),
          saludo: ""
        })
    case ADD_TODO: //concatena la nueva tarea en el estado
      if(typeof state.todos !== "undefined")
        action.todo.id = state.todos.length;
      else{
          action.todo.id = 0;
          state.todos = [];
      }

      console.log( state.todos.length + " -- " + action.todo.id)
      return Object.assign({}, state, {
        todos: state.todos.concat(Object.assign({}, action.todo)),
        lastUpdate: new Date(),
        saludo: state.saludo
      })
      case TOGGLE_TODO: //Cambia a completo o no la tarea
        var todo = state.todos.find(t => t.id === action.id);
        var index = state.todos.indexOf(todo);
        return Object.assign({}, state, {
          todos: [
            ...state.todos.slice(0, index),
            Object.assign({}, todo, {
              isCompleted: !todo.isCompleted
            }),
            ...state.todos.slice(index+1)
          ],
          lastUpdate: new Date(),
          saludo: state.saludo
        })
      case REMOVE_TODO: //Elimina una tarea
        return Object.assign({}, state, {
          todos: state.todos.filter(t => t.id !== action.id),
          lastUpdate: new Date(),
          saludo: state.saludo
        })
      case REMOVE_ALL_TODOS: //vacia la lista de tareas
      return Object.assign({}, state, {
        todos: [],
        lastUpdate: new Date(),
        saludo: state.saludo
      })
      case SAVE_STATE:
        return Object.assign({}, state)
      case RECOVE_STATE:
        return Object.assign({}, state)
  }
}
/*
export function guardarStorage(){
  localStorage.setItem('estado', JSON.stringify(this.marcadores));
}

export function recuperarStorage(){
  if(localStorage.getItem('marcadores')){
    this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
  }

}*/

export const saveState = (state) => {
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);    
  } catch(err) {
    //errorrrr
  }
}

export const recoverState = () => {
  try{
    if(localStorage.getItem('state')){
      return JSON.parse(localStorage.getItem('state'));
    }
  } catch(err) {
    //errorrrr
  }
}
