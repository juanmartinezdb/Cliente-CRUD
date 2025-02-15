import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { FirstRunService } from './service/first-run.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  start: FirstRunService = inject(FirstRunService);
  title = 'CRUDANGULAR';
constructor() {
  this.start.extractInitialData();

}
  ngOnInit(): void {
  

  }

}
