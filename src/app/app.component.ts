import { Component, OnInit, HostListener } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  apps: any[] = [];

  constructor(private http: Http) {  }

  // Detect HashChange
  @HostListener('window:hashchange')
  onHashChange() {
      // reload list with tag search
      // (Backwards compatibility)
      console.log('changed')
  }

  ngOnInit() {
    this.http.get('/assets/catalog.json')
      .subscribe(res => {
        const data = res.json();

        data.item.forEach(element => {
          element.image = 'assets/' + element.name + '.jpg';
        });

        this.apps = data.item.reverse();
      }
    );
  }

  onTagsChange(tag) {
    window.location.hash = tag === '[ all ]' ? '' : tag;
  }
}
