import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fc-app-cell',
  templateUrl: './app-cell.component.html',
  styleUrls: ['./app-cell.component.styl']
})
export class AppCellComponent implements OnInit {

  @Input() app: any;

  constructor() { }

  ngOnInit() { }

  openApp() {
    window.open('http://fukuno.jig.jp/2012/' + this.app.name, '_blank');
  }

}
