import { Component, OnInit, HostListener } from '@angular/core';
import { Http } from '@angular/http';

import * as _ from 'lodash';


@Component({
  selector: 'fc-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  apps: any[] = [];
  tags: string[] = ['[ all ]'];

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
        this.makeTags();
      }
    );
  }

  private makeTags() {
    this.apps.forEach(app => {
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

    console.log(this.tags);



    console.log(this.apps);

    // for (var i = 0; i < items.length; i++) {
    //   var item = items[i];
    //   var tag = item.tags.split(",");
    //   for (var j = 0; j < tag.length; j++) {
    //     var s = tag[j].trim();
    //     if (tags[s] == null) {
    //       tags[s] = [ s, 0 ];
    //     } else {
    //       tags[s][1]++;
    //     }
    //   }
    // }

//     var opt = create("option");
//     opt.textContent = "[ all ]";
//     $("tags").appendChild(opt);
//     var max = 0xffff;
// //	dump(tags);
//     for (;;) {
//       var t = null;
//       var n = -1;
//       for (var tag in tags) {
//         if (tags[tag][1] > n && tags[tag][1] < max) {
//           t = tags[tag];
//           n = tags[tag][1];
//         }
//       }
//       max = n;
//       if (t == null)
//         break;
//       for (var tag in tags) {
//         if (tags[tag][1] == max) {
//           t = tags[tag];
//           var opt = create("option");
//           opt.textContent = opt.value = t[0];
//           $("tags").appendChild(opt);
//         }
//       }
//     }
//     $("tags").onchange = function() {
//       if (this.value == TAG_ALL)
//         location.hash = "";
//       else
//         location.hash = "#" + this.value;
// //		flow();
//     };

  }

  onTagsChange(tag) {
    window.location.hash = tag === '[ all ]' ? '' : tag;
  }
}
