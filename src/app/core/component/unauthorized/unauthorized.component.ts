import { Component, OnInit } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
