import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'CRUDANGULAR';
constructor() {

}
  ngOnInit(): void {


  }

}
