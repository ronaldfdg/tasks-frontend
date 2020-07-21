import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  author: string = 'Ronald Dolores';

  constructor() { }

  ngOnInit(): void {
  }

}
