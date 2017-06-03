import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  apps: any[] = [];

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('/assets/catalog.json')
      .subscribe(res => {
        const data = res.json();
        this.apps = data.item;
        console.log(this.apps);
      }
    );
  }
}
