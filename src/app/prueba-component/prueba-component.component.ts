import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, saveState, recoverState } from '../store';

@Component({
  selector: 'app-prueba-component',
  templateUrl: './prueba-component.component.html',
  styleUrls: ['./prueba-component.component.css']
})
export class PruebaComponentComponent implements OnInit {
  @select() todos;
  @select() saludo;
  
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
  }

}
