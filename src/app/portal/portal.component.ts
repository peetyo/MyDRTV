import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onActivate(event) {
    window.scroll(0,0);
  }
}
