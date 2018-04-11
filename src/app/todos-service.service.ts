import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './store';
import { PRUEBA_ASYNC, PRUEBA_ASYNC_SUCCESS, PRUEBA_ASYNC_ERROR } from './actions';

@Injectable()
export class TodosServiceService {

  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>
  ) { }

  private getHeaders():HttpHeaders{
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    //console.log(headers)
    return headers;
  }

  getTodos() {
    console.log("Servicio")
     this.ngRedux.dispatch( { type: PRUEBA_ASYNC } )
     this.http.get("http://localhost:8080/hola/llamadaSOAP1", { headers: this.getHeaders() })
     .subscribe(
       res => {
          console.log(res);
          this.ngRedux.dispatch( { type: PRUEBA_ASYNC_SUCCESS, payload: JSON.stringify(res) } )
        },
      error => {
        console.log(error);
        this.ngRedux.dispatch( { type: PRUEBA_ASYNC_ERROR } )
      }
    );
 }

}
