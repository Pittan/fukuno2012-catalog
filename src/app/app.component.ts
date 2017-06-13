import { Component, OnInit, HostListener } from '@angular/core';
import { Http } from '@angular/http';

import * as _ from 'lodash';


@Component({
  selector: 'fc-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  private internalApps: any[] = [];

  apps: any[] = [];
  tags: string[] = ['[ all ]'];
  selectedTag = '[ all ]';

  constructor(private http: Http) {  }

  // Detect HashChange
  @HostListener('window:hashchange')
  onHashChange() {
    this.search();
  }

  ngOnInit() {
    this.http.get(this.baseUri() + '/assets/catalog.json')
      .subscribe(res => {
        const data = res.json();

        data.item.forEach(element => {
          element.image = 'assets/' + element.name + '.jpg';
        });

        this.internalApps = data.item.reverse();
        this.makeTags();
        this.search();
      }
    );
  }

  private makeTags() {
    this.internalApps.forEach(app => {
      app.tag = [];
      const appTags = app.tags.split(',')
      appTags.forEach(tag => {
        const trimmedTag = tag.trim();
        app.tag.push(trimmedTag);

        // タグリストを作成する
        const res = _.find(this.tags, (t) => {
          return t === trimmedTag;
        });
        if (!res) {
          this.tags.push(trimmedTag);
        }

      });
    });
  }

  onTagsChange(tag) {
    window.location.hash = tag === '[ all ]' ? '' : tag;
  }

  search() {
    this.selectedTag = window.location.hash === '' ? '[ all ]' : window.location.hash.substring(1);

    this.apps = [];

    if (this.selectedTag === '[ all ]') {
      this.apps = this.internalApps;
      return;
    }

    const apps = [];

    this.internalApps.forEach(app => {
      const appTags = app.tags.split(',');

      appTags.forEach(tag => {
        const trimmedTag = tag.trim();

        if (trimmedTag === this.selectedTag) {
          apps.push(app);
        }

      });
    });

    this.apps = apps;

    // HACK: ng-lazyload-imageが発火しないので意図的にスクロールする
    window.scrollTo(window.scrollX, window.scrollY + 1);
    window.scrollTo(window.scrollX, window.scrollY - 1);

  }

  private baseUri() {
    const baseUri = document.baseURI;
    if (baseUri) {
      return baseUri;
    }
    const base = document.getElementsByTagName('base')[0];
    return base.href;
  }
}
